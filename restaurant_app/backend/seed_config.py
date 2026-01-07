import sys
import os

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
import models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["sha256_crypt"], deprecated="auto")

def seed_config():
    db = SessionLocal()
    
    # Real data from the image
    contact_data = {
        "address": "Arturo Soria, 198, 28043, Madrid.",
        "phone": "+34 912 345 678", # Placeholder
        "email": "info@gulahpoboys.com",
        "reservation_email": "reservas@gulahpoboys.com",
        "hours": "Lunes a Viernes: 10 am - 24 pm | Sábados y Domingos: 13 pm - 24 pm"
    }

    seeds = [
        ("contact_info", contact_data),
        ("welcomeTitle", "EL PLACER ES NUESTRO"),
        ("welcomeSubtitle", "Bienvenido a Gulah, el templo de los auténticos Po'Boys. Aquí cada bocado es una explosión sin filtros."),
        ("heroBtn1", {"text": "Ver la Carta", "link": "/menu", "style": "btn-primary"}),
        ("heroBtn2", {"text": "Reservar Mesa", "link": "/reservations", "style": "btn-secondary"}),
        ("eventsTitle", "JOURNAL GULAH"),
        ("eventsSubtitle", "Eventos, historias y el humo que nos une."),
        ("menuTitle", "NUESTRA CARTA"),
        ("menuSubtitle", "Explosión de sabores sin filtros. Sin excusas."),
        ("menuEmptyState", "Próximamente... estamos cocinando algo grande."),
        ("reservationsTitle", "¿TIENES HAMBRE DE FUEGO?"),
        ("reservationsSubtitle", "Reserva tu mesa y déjate llevar por el sabor más salvaje."),
        ("reservationsBtn", {"text": "RESERVAR MESA", "link": "https://www.covermanager.com/reserve/module_restaurant/restaurante-gulah/spanish", "style": "btn-primary"}),
        ("reservationsPhone", "También puedes llamarnos al +34 912 345 678")
    ]

    for k, v in seeds:
        db_config = db.query(models.SiteConfig).filter(models.SiteConfig.key == k).first()
        if not db_config:
            db_config = models.SiteConfig(key=k, value=v)
            db.add(db_config)

    # Super User
    admin_user = db.query(models.User).filter(models.User.username == "arubio").first()
    if not admin_user:
        hashed_pwd = pwd_context.hash("gulaAdmin2202")
        admin_user = models.User(
            username="arubio",
            hashed_password=hashed_pwd,
            is_admin=True,
            is_superuser=True
        )
        db.add(admin_user)
        print("Super usuario arubio creado correctamente.")

    # Initial Blog Posts
    if not db.query(models.BlogPost).first():
        db.add(models.BlogPost(
            title="Noche de Jazz & BBQ",
            content="Ven a disfrutar de una velada única con los mejores músicos de jazz locales mientras degustas nuestras icónicas alitas.",
            image_url="/images/Wings.jpeg"
        ))
        db.add(models.BlogPost(
            title="Secretos del Ahumado",
            content="Descubre cómo preparamos nuestro Pulled Pork en una sesión especial con nuestro Pitmaster.",
            image_url="/images/pulled pork.jpeg"
        ))

    db.commit()
    db.close()
    print("¡Datos del local cargados correctamente en la BBDD!")

if __name__ == "__main__":
    seed_config()
