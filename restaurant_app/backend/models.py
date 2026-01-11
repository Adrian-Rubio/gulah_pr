from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    """
    Represents a system user with authentication and permission levels.
    """
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)

class MenuItem(Base):
    """
    Represents a food or drink item in the restaurant menu.
    Includes classification, pricing, allergens, and availability status.
    """
    __tablename__ = "menu_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    base_price = Column(Float)
    category = Column(String)
    image_url = Column(String, nullable=True)
    allergens = Column(JSON, default=[])
    variants = Column(JSON, default=[])
    tags = Column(JSON, default=[])
    is_active = Column(Boolean, default=True)
    is_promoted = Column(Boolean, default=False)
    is_new = Column(Boolean, default=False)

class Reservation(Base):
    """
    Represents a customer table reservation.
    """
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)
    date_time = Column(DateTime)
    guests = Column(Integer)
    status = Column(String, default="pending")

class BlogPost(Base):
    """
    Represents an entry in the restaurant's news or event journal.
    """
    __tablename__ = "blog_posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    author = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    image_url = Column(String, nullable=True)

class SiteConfig(Base):
    """
    Stores dynamic site settings and content (typography, contact info, etc.) 
    as key-value pairs where value is a JSON-serializable object.
    """
    __tablename__ = "site_configs"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    value = Column(JSON)
