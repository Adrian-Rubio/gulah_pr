from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import models
from database import engine, get_db
import shutil
import os
import uuid
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Restaurant API")

# Ensure uploads directory exists
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Changed from True because allow_origins=["*"] is not compatible with True
    allow_methods=["*"],
    allow_headers=["*"],
)

import schemas
from typing import List

# ... (rest of imports and initialization)

@app.get("/")
async def root():
    return {"message": "Welcome to the Restaurant API"}

@app.get("/health")
async def health():
    return {"status": "ok"}

# --- Public Endpoints ---

@app.get("/menu", response_model=List[schemas.MenuItem])
def get_menu(db: Session = Depends(get_db)):
    return db.query(models.MenuItem).filter(models.MenuItem.is_active == True).all()

@app.get("/blog")
def get_blog(db: Session = Depends(get_db)):
    return db.query(models.BlogPost).order_by(models.BlogPost.created_at.desc()).all()

@app.get("/blog/{post_id}")
def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.get("/config")
def get_config(db: Session = Depends(get_db)):
    configs = db.query(models.SiteConfig).all()
    return {c.key: c.value for c in configs}

# --- Admin Menu Endpoints ---

@app.get("/admin/menu", response_model=List[schemas.MenuItem])
def admin_get_menu(db: Session = Depends(get_db)):
    return db.query(models.MenuItem).all()

@app.post("/admin/menu", response_model=schemas.MenuItem)
def create_menu_item(item: schemas.MenuItemCreate, db: Session = Depends(get_db)):
    db_item = models.MenuItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.put("/admin/menu/{item_id}", response_model=schemas.MenuItem)
def update_menu_item(item_id: int, item: schemas.MenuItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

@app.patch("/admin/menu/{item_id}/status", response_model=schemas.MenuItem)
def toggle_item_status(item_id: int, status_update: dict, db: Session = Depends(get_db)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for key in ["is_active", "is_promoted", "is_new"]:
        if key in status_update:
            setattr(db_item, key, status_update[key])
    
    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/admin/menu/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}

@app.post("/admin/config")
def update_config(config: dict, db: Session = Depends(get_db)):
    # Expects format: {"key": "...", "value": ...}
    key = config.get("key")
    value = config.get("value")
    if not key:
        raise HTTPException(status_code=400, detail="Key is required")
    
    db_config = db.query(models.SiteConfig).filter(models.SiteConfig.key == key).first()
    if db_config:
        db_config.value = value
    else:
        db_config = models.SiteConfig(key=key, value=value)
        db.add(db_config)
    
    db.commit()
    return {"message": f"Config {key} updated successfully"}

@app.post("/admin/upload")
async def upload_file(file: UploadFile = File(...)):
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    file_url = f"/static/uploads/{unique_filename}"
    return {"url": file_url}

# --- Admin Blog Endpoints ---

@app.post("/admin/blog", response_model=schemas.BlogPost)
def create_blog_post(post: schemas.BlogPostCreate, db: Session = Depends(get_db)):
    db_post = models.BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.delete("/admin/blog/{post_id}")
def delete_blog_post(post_id: int, db: Session = Depends(get_db)):
    db_post = db.query(models.BlogPost).filter(models.BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted successfully"}

# --- User Management Endpoints ---

@app.post("/admin/login")
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == request.username).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Usuario o contraseña incorrectos")
    
    return {
        "id": user.id,
        "username": user.username,
        "is_admin": user.is_admin,
        "is_superuser": user.is_superuser
    }

@app.get("/admin/users", response_model=List[schemas.User])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.post("/admin/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if exists
    existing = db.query(models.User).filter(models.User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    db_user = models.User(
        username=user.username,
        hashed_password=get_password_hash(user.password),
        is_admin=user.is_admin,
        is_superuser=user.is_superuser
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.put("/admin/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if user.username is not None:
        db_user.username = user.username
    if user.password is not None and user.password.strip() != "":
        db_user.hashed_password = get_password_hash(user.password)
    if user.is_admin is not None:
        db_user.is_admin = user.is_admin
    if user.is_superuser is not None:
        db_user.is_superuser = user.is_superuser
    
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Don't delete last superuser maybe? For now just delete.
    db.delete(db_user)
    db.commit()
    return {"message": "Usuario eliminado"}
