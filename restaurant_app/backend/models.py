from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=True)

class MenuItem(Base):
    __tablename__ = "menu_items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    price = Column(Float)
    category = Column(String) # e.g., Starter, Main, Dessert, Drink
    image_url = Column(String, nullable=True)
    is_available = Column(Boolean, default=True)

class Reservation(Base):
    __tablename__ = "reservations"
    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)
    date_time = Column(DateTime)
    guests = Column(Integer)
    status = Column(String, default="pending") # pending, confirmed, cancelled

class BlogPost(Base):
    __tablename__ = "blog_posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    author = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    image_url = Column(String, nullable=True)

class SiteConfig(Base):
    __tablename__ = "site_configs"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, index=True)
    value = Column(JSON) # Store dynamic config like colors, banner text, etc.
