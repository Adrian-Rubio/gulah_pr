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

@app.get("/")
async def root():
    return {"message": "Welcome to the Restaurant API"}

@app.get("/health")
async def health():
    return {"status": "ok"}

# --- Public Endpoints ---

@app.get("/menu")
def get_menu(db: Session = Depends(get_db)):
    return db.query(models.MenuItem).filter(models.MenuItem.is_available == True).all()

@app.get("/blog")
def get_blog(db: Session = Depends(get_db)):
    return db.query(models.BlogPost).order_by(models.BlogPost.created_at.desc()).all()

@app.get("/config")
def get_config(db: Session = Depends(get_db)):
    configs = db.query(models.SiteConfig).all()
    return {c.key: c.value for c in configs}
