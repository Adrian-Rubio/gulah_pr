import requests
import json

BASE_URL = "http://192.168.0.221:8000/admin/menu"

menu_data = [
    # ENTRANTES
    {"name": "CRISPY WINGS", "description": "Alitas MUY CRUJIENTES. Puedes elegir una de nuestras salsas como extra para mojar.", "base_price": 9.90, "category": "ENTRANTES", "allergens": ["Gluten"]},
    {"name": "CHILI CHEESE BITES", "description": "Jalapeños rellenos de queso cheddar.", "base_price": 9.35, "category": "ENTRANTES", "allergens": ["Lácteos", "Gluten"]},
    {"name": "CHICKEN CHURROS", "description": "Churros y fingers de pollo sobre salsa de queso de cabra y sirope de arce.", "base_price": 12.20, "category": "ENTRANTES", "allergens": ["Lácteos", "Gluten"]},
    {"name": "ONION RINGS", "description": "Aros de cebolla a la cerveza con nuestra salsa sureña especial.", "base_price": 10.00, "category": "ENTRANTES", "allergens": ["Gluten"]},
    {"name": "ALITAS DEL INFIERNO", "description": "Alitas crujientes para amantes del picante.", "base_price": 13.00, "category": "ENTRANTES", "allergens": ["Lácteos", "Gluten", "Huevos"]},
    {"name": "ALITAS GARLIC PARMESAN", "description": "Nuestras tradicionales alitas con salsa garlic y espolvoreadas con queso parmesano", "base_price": 12.00, "category": "ENTRANTES", "allergens": []},
    {"name": "ALITAS BBQ PX", "description": "Alitas crujientes bañadas en nuestra salsa sureña especial.", "base_price": 11.00, "category": "ENTRANTES", "allergens": ["Soja", "Gluten", "Dióxido de Azufre y Sulfitos"]},
    {"name": "NACHOS GULAH", "description": "Nachos de maíz con birria de la casa, crema agria, guacamole y cebolla encurtida.", "base_price": 15.00, "category": "ENTRANTES", "allergens": ["Lácteos"]},
    {"name": "MAC AND CHEESE", "description": "El Auténtico Plato Americano: - Solos. - Con Chistorra. - Con Bacon - Con Pollo Crujiente.", "base_price": 9.90, "category": "ENTRANTES", "allergens": ["Lácteos", "Gluten"]},

    # PATATAS
    {"name": "PATATAS BRAVIOLI", "description": "Patatas fritas con salsa brava casera y alioli de ajo asado.", "base_price": 7.00, "category": "PATATAS", "allergens": ["Gluten", "Huevos"]},
    {"name": "PATATAS RANCHERAS", "description": "Patatas fritas con nuestra salsa ranchera, bacon crujiente y queso cheddar.", "base_price": 10.00, "category": "PATATAS", "allergens": ["Lácteos"]},
    {"name": "HUEVOS RANCHEROS", "description": "Huevos de rancho, con patatas, huevos fritos y bacon cruquiente", "base_price": 12.00, "category": "PATATAS", "allergens": ["Huevos"]},

    # ENSALADAS
    {"name": "BRUTUS CHOICE", "description": "Ensalada en base de lechuga, pollo rebozado, salsa césar, bacon bits y queso parmesano.", "base_price": 12.50, "category": "ENSALADAS", "allergens": ["Pescado", "Lácteos", "Gluten", "Huevos"]},
    {"name": "GUACA-LOVER", "description": "Ensalada en base de mézclum con frijoles, maíz, guacamole, pico de gallo, crema agria y tiras de nachos crujientes.", "base_price": 10.00, "category": "ENSALADAS", "allergens": ["Lácteos"]},
    {"name": "HIGO & ROLL", "description": "Ensalada en base de canónigos, queso de cabra e higos confitados.", "base_price": 12.65, "category": "ENSALADAS", "allergens": ["Lácteos", "Frutos de Cáscara"]},

    # PO BOYS
    {"name": "JAZZ BALLS", "description": "Po’boy de albóndigas de la nonna con salsa de tomate casera y queso de mozzarella.", "base_price": 12.50, "category": "PO BOYS", "allergens": ["Lácteos", "Gluten"], "variants": [{"name": "Normal", "price": 12.50}, {"name": "XL", "price": 14.50}]},
    {"name": "VODOO VEGGY", "description": "Po’boy vegetariano de seta ostra crujiente, lechuga, tomate y salsa remoulade (ojo pica).", "base_price": 12.50, "category": "PO BOYS", "allergens": ["Apio", "Gluten", "Huevos", "Dióxido de Azufre y Sulfitos"], "variants": [{"name": "Regular", "price": 12.50}, {"name": "Large", "price": 13.50}]},
    {"name": "PHILLY CHEESESTEAK", "description": "Po Boy de lomo salteado a la plancha con cebolla y salsa de queso cheddar", "base_price": 12.50, "category": "PO BOYS", "allergens": [], "variants": [{"name": "Regular", "price": 12.50}, {"name": "Large", "price": 16.00}]},
    {"name": "TORO LOCO", "description": "Po’boy de rabo de toro guisado durante 24h con guacamole y cebolla encurtida.", "base_price": 12.50, "category": "PO BOYS", "allergens": ["Apio", "Gluten"], "variants": [{"name": "Regular", "price": 12.50}, {"name": "Large", "price": 14.50}]},
    {"name": "PULLED PORK", "description": "Po Boy de cerdo desmigado con ensalada de col, pepinillos y salsa bbq", "base_price": 12.50, "category": "PO BOYS", "allergens": [], "variants": [{"name": "Regular", "price": 12.50}, {"name": "Large", "price": 15.00}]},
    {"name": "CHICKEN RUN", "description": "Po’boy de pollo frito con coleslaw y mayopicante.", "base_price": 12.00, "category": "PO BOYS", "allergens": ["Mostaza", "Gluten", "Huevos", "Dióxido de Azufre y Sulfitos"], "variants": [{"name": "Regular", "price": 12.00}, {"name": "Large", "price": 12.50}]},
    {"name": "EGGS & GLORY", "description": "Po’boy de huevos rotos con chistorra y patatas fritas.", "base_price": 11.50, "category": "PO BOYS", "allergens": ["Gluten", "Huevos"], "variants": [{"name": "Regular", "price": 11.50}, {"name": "Large", "price": 12.50}]},
    {"name": "THE SLOW BURN", "description": "Po’boy de costilla de ternera cocinada a baja temperatura y bañada en salsa bbq.", "base_price": 12.50, "category": "PO BOYS", "allergens": ["Lácteos", "Gluten"], "variants": [{"name": "Regular", "price": 12.50}, {"name": "Large", "price": 15.00}]},
    {"name": "MR PINZAS", "description": "Po’boy frío de cangrejo estilo new orleans y salsa dijonesa.", "base_price": 12.50, "category": "PO BOYS", "allergens": ["Crustáceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]},
    {"name": "CHULAPOH BOY", "description": "Po’boy de calamares fritos con mayonesa de lima.", "base_price": 12.50, "category": "PO BOYS", "allergens": ["Crustáceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"], "variants": [{"name": "Regular", "price": 12.50}, {"name": "Large", "price": 13.75}]},

    # BRIOCHE
    {"name": "STEAK & CHIC", "description": "Mini pan brioche relleno de nuestro steak tartar con mayonesa de alcaparra y encurtidos (dos unidades)", "base_price": 12.50, "category": "BRIOCHE", "allergens": ["Lácteos", "Mostaza", "Gluten", "Huevos", "Dióxido de Azufre y Sulfitos"]},
    {"name": "SMOKY SALMON", "description": "Mini pan brioche relleno de salmón ahumado con crema de queso y eneldo acompañada de mousse de piparra (dos unidades)", "base_price": 13.50, "category": "BRIOCHE", "allergens": ["Pescado", "Lácteos", "Gluten", "Huevos"]},

    # POSTRES
    {"name": "TARTA DE QUESO", "description": "Tarta de queso al estilo del norte con sirope de frutos rojos", "base_price": 6.75, "category": "POSTRES", "allergens": ["Lácteos"]},
    {"name": "B.B.BROWNIE", "description": "Brownie de chocolate con helado de vainilla.", "base_price": 6.50, "category": "POSTRES", "allergens": ["Lácteos", "Gluten", "Frutos de Cáscara"]},
    {"name": "FUNKY BANANA", "description": "Postre de banana con un toque funky.", "base_price": 6.00, "category": "POSTRES", "allergens": []},

    # SALSAS
    {"name": "SALSA MAYO ALCAPARRA", "description": "Salsa cremosa de mayonesa con alcaparras.", "base_price": 0.90, "category": "SALSAS", "allergens": ["Huevos"]},
    {"name": "SALSA CHEDDAR", "description": "Nuestra famosa salsa de queso cheddar fundido.", "base_price": 0.90, "category": "SALSAS", "allergens": ["Lácteos"]},
    {"name": "SALSA BACONESA", "description": "Mayonesa con sabor a bacon ahumado.", "base_price": 0.90, "category": "SALSAS", "allergens": ["Huevos"]},
    {"name": "SALSA BBQ-PX", "description": "Salsa barbacoa con reducción de Pedro Ximénez.", "base_price": 0.90, "category": "SALSAS", "allergens": []},
    {"name": "SALSA MAYO-LIMA", "description": "Mayonesa cítrica con un toque de lima fresca.", "base_price": 0.90, "category": "SALSAS", "allergens": ["Huevos"]},
    {"name": "SALSA HOT", "description": "Salsa picante para los valientes.", "base_price": 0.90, "category": "SALSAS", "allergens": []},
    {"name": "SALSA GOCHUMAYO", "description": "Fusión coreana de gochujang y mayonesa.", "base_price": 0.90, "category": "SALSAS", "allergens": ["Huevos", "Soja"]},
    {"name": "SALSA DIJONESA", "description": "Salsa de mostaza de Dijon y mayonesa.", "base_price": 0.90, "category": "SALSAS", "allergens": ["Mostaza", "Huevos"]},
]

for item in menu_data:
    try:
        response = requests.post(BASE_URL, json=item)
        if response.status_code == 200:
            print(f"Success: {item['name']}")
        else:
            print(f"Failed: {item['name']} - {response.text}")
    except Exception as e:
        print(f"Error seeding {item['name']}: {e}")

print("Seeding complete!")
