from pydantic import BaseModel
from typing import List, Optional, Any

class MenuItemBase(BaseModel):
    name: str
    description: str
    base_price: float
    category: str
    image_url: Optional[str] = None
    allergens: List[str] = []
    variants: List[dict] = []
    tags: List[str] = []
    is_active: bool = True
    is_promoted: bool = False
    is_new: bool = False

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    base_price: Optional[float] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    allergens: Optional[List[str]] = None
    variants: Optional[List[dict]] = None
    tags: Optional[List[str]] = None
    is_active: Optional[bool] = None
    is_promoted: Optional[bool] = None
    is_new: Optional[bool] = None

class MenuItem(MenuItemBase):
    id: int

    class Config:
        from_attributes = True
