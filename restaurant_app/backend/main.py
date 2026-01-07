from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
from database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Restaurant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
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
