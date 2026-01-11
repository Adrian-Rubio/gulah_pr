from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models
import schemas
from database import get_db

router = APIRouter(
    prefix="/menu",
    tags=["menu"]
)

@router.get("/", response_model=List[schemas.MenuItem])
def get_menu(db: Session = Depends(get_db)):
    """
    Retrieves all active menu items.
    
    Args:
        db (Session): Database session.
        
    Returns:
        List[MenuItem]: Array of active menu items.
    """
    return db.query(models.MenuItem).filter(models.MenuItem.is_active == True).all()

@router.get("/admin", response_model=List[schemas.MenuItem])
def admin_get_menu(db: Session = Depends(get_db)):
    """
    Retrieves all menu items (including inactive ones) for administrative use.
    
    Args:
        db (Session): Database session.
        
    Returns:
        List[MenuItem]: Array of all menu items.
    """
    return db.query(models.MenuItem).all()

@router.post("/admin", response_model=schemas.MenuItem)
def create_menu_item(item: schemas.MenuItemCreate, db: Session = Depends(get_db)):
    """
    Creates a new menu item.
    
    Args:
        item (MenuItemCreate): Data for the new menu item.
        db (Session): Database session.
        
    Returns:
        MenuItem: The created menu item.
    """
    db_item = models.MenuItem(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/admin/{item_id}", response_model=schemas.MenuItem)
def update_menu_item(item_id: int, item: schemas.MenuItemUpdate, db: Session = Depends(get_db)):
    """
    Updates an existing menu item.
    
    Args:
        item_id (int): ID of the item to update.
        item (MenuItemUpdate): Updated data.
        db (Session): Database session.
        
    Returns:
        MenuItem: The updated menu item.
    """
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    update_data = item.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.patch("/admin/{item_id}/status", response_model=schemas.MenuItem)
def toggle_item_status(item_id: int, status_update: dict, db: Session = Depends(get_db)):
    """
    Toggles specific boolean flags of a menu item (active, promoted, new).
    
    Args:
        item_id (int): ID of the item.
        status_update (dict): Dictionary with flags to update.
        db (Session): Database session.
        
    Returns:
        MenuItem: The updated menu item.
    """
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for key in ["is_active", "is_promoted", "is_new"]:
        if key in status_update:
            setattr(db_item, key, status_update[key])
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/admin/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    """
    Deletes a menu item from the database.
    
    Args:
        item_id (int): ID of the item to delete.
        db (Session): Database session.
        
    Returns:
        dict: Success message.
    """
    db_item = db.query(models.MenuItem).filter(models.MenuItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted successfully"}
