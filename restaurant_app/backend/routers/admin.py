from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.orm import Session
import os
import uuid
import shutil
import models
from database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/config")
def get_config(db: Session = Depends(get_db)):
    """
    Retrieves the entire site configuration.
    
    Args:
        db (Session): Database session.
        
    Returns:
        dict: Key-value pairs of site configuration.
    """
    configs = db.query(models.SiteConfig).all()
    return {c.key: c.value for c in configs}

@router.post("/config")
def update_config(config: dict, db: Session = Depends(get_db)):
    """
    Updates or creates a configuration entry.
    
    Args:
        config (dict): Entry containing 'key' and 'value'.
        db (Session): Database session.
        
    Returns:
        dict: Success message.
    """
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

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Handles file uploads, specifically for menu and blog images.
    
    Args:
        file (UploadFile): The file to upload.
        
    Returns:
        dict: The public URL of the uploaded file.
    """
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    file_url = f"/static/uploads/{unique_filename}"
    return {"url": file_url}
