BEGIN TRANSACTION;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS site_configs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE blog_posts (
	id SERIAL PRIMARY KEY,
	title VARCHAR,
	content TEXT,
	author VARCHAR,
	created_at TIMESTAMP,
	image_url VARCHAR
);
INSERT INTO "blog_posts" VALUES(1,'Noche de Jazz & BBQ','Ven a disfrutar de una velada única con los mejores músicos de jazz locales mientras degustas nuestras icónicas alitas.',NULL,'2026-01-08 10:19:39.506951','/images/Wings.jpeg');
INSERT INTO "blog_posts" VALUES(2,'Secretos del Ahumado','Descubre cómo preparamos nuestro Pulled Pork en una sesión especial con nuestro Pitmaster.',NULL,'2026-01-08 10:19:39.506955','/images/pulled pork.jpeg');
CREATE TABLE menu_items (
	id SERIAL PRIMARY KEY, 
	name VARCHAR, 
	description TEXT, 
	base_price FLOAT, 
	category VARCHAR, 
	image_url VARCHAR, 
	allergens JSONB, 
	variants JSONB, 
	tags JSONB, 
	is_active BOOLEAN, 
	is_promoted BOOLEAN, 
	is_new BOOLEAN
);
INSERT INTO "menu_items" VALUES(1,'CRISPY WINGS','Alitas MUY CRUJIENTES. Puedes elegir una de nuestras salsas como extra para mojar.',9.9,'ENTRANTES','/images/Wings.jpeg','["Gluten"]','[]','[]',1,0,0);
INSERT INTO "menu_items" VALUES(2,'CHILI CHEESE BITES','Jalapeños rellenos de queso cheddar.',9.35,'ENTRANTES','/images/chili cheese bites.jpeg','["L\u00e1cteos", "Gluten"]','[]','[]',1,0,0);
INSERT INTO "menu_items" VALUES(3,'CHICKEN CHURROS','Churros y fingers de pollo sobre salsa de queso de cabra y sirope de arce.',12.2,'ENTRANTES',NULL,'["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(4,'ONION RINGS','Aros de cebolla a la cerveza con nuestra salsa sureña especial.',10.0,'ENTRANTES',NULL,'["Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(5,'ALITAS DEL INFIERNO','Alitas crujientes para amantes del picante.',13.0,'ENTRANTES','/images/alitas infierno.jpeg','["L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(6,'ALITAS GARLIC PARMESAN','Nuestras tradicionales alitas con salsa garlic y espolvoreadas con queso parmesano',12.0,'ENTRANTES','/images/alitas garlic parmesan.jpeg','[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(7,'ALITAS BBQ PX','Alitas crujientes bañadas en nuestra salsa sureña especial.',11.0,'ENTRANTES','/images/alitas bbq px.jpeg','["Soja", "Gluten", "Di\u00f3xido de Azufre y Sulfitos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(8,'NACHOS GULAH','Nachos de maíz con birria de la casa, crema agria, guacamole y cebolla encurtida.',15.0,'ENTRANTES','/images/nachos gulah.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(9,'MAC AND CHEESE','El Auténtico Plato Americano: - Solos. - Con Chistorra. - Con Bacon - Con Pollo Crujiente.',9.9,'ENTRANTES','/images/mac and cheese.jpeg','["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(10,'PATATAS BRAVIOLI','Patatas fritas con salsa brava casera y alioli de ajo asado.',7.0,'PATATAS',NULL,'["Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(11,'PATATAS RANCHERAS','Patatas fritas con nuestra salsa ranchera, bacon crujiente y queso cheddar.',10.0,'PATATAS','/images/patatas rancheras.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(12,'HUEVOS RANCHEROS','Huevos de rancho, con patatas, huevos fritos y bacon cruquiente',12.0,'PATATAS','/images/huevos rancheros.jpeg','["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(13,'BRUTUS CHOICE','Ensalada en base de lechuga, pollo rebozado, salsa césar, bacon bits y queso parmesano.',12.5,'ENSALADAS','/images/brutus choice.jpeg','["Pescado", "L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(14,'GUACA-LOVER','Ensalada en base de mézclum con frijoles, maíz, guacamole, pico de gallo, crema agria y tiras de nachos crujientes.',10.0,'ENSALADAS','/images/guaca-lover.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(15,'HIGO & ROLL','Ensalada en base de canónigos, queso de cabra e higos confitados.',12.65,'ENSALADAS','/images/higo & roll.jpeg','["L\u00e1cteos", "Frutos de C\u00e1scara"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(16,'JAZZ BALLS','Po’boy de albóndigas de la nonna con salsa de tomate casera y queso de mozzarella.',12.5,'PO BOYS','/images/jazz balls.jpeg','["L\u00e1cteos", "Gluten"]','[{"name": "Normal", "price": 12.5}, {"name": "XL", "price": 14.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(17,'VODOO VEGGY','Po’boy vegetariano de seta ostra crujiente, lechuga, tomate y salsa remoulade (ojo pica).',12.5,'PO BOYS','/images/voodo veggie.jpeg','["Apio", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 13.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(18,'PHILLY CHEESESTEAK','Po Boy de lomo salteado a la plancha con cebolla y salsa de queso cheddar',12.5,'PO BOYS','/images/PHILLY CHEESESTEAK.jpeg','[]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 16.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(19,'TORO LOCO','Po’boy de rabo de toro guisado durante 24h con guacamole y cebolla encurtida.',12.5,'PO BOYS','/images/toro loco.jpeg','["Apio", "Gluten"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 14.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(20,'PULLED PORK','Po Boy de cerdo desmigado con ensalada de col, pepinillos y salsa bbq',12.5,'PO BOYS','/images/pulled pork.jpeg','[]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 15.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(21,'CHICKEN RUN','Po’boy de pollo frito con coleslaw y mayopicante.',12.0,'PO BOYS','/images/chicken run.jpeg','["Mostaza", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[{"name": "Regular", "price": 12.0}, {"name": "Large", "price": 12.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(22,'EGGS & GLORY','Po’boy de huevos rotos con chistorra y patatas fritas.',11.5,'PO BOYS','/images/eggs & glory.jpeg','["Gluten", "Huevos"]','[{"name": "Regular", "price": 11.5}, {"name": "Large", "price": 12.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(23,'THE SLOW BURN','Po’boy de costilla de ternera cocinada a baja temperatura y bañada en salsa bbq.',12.5,'PO BOYS','/images/the slow burn.jpeg','["L\u00e1cteos", "Gluten"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 15.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(24,'MR PINZAS','Po’boy frío de cangrejo estilo new orleans y salsa dijonesa.',12.5,'PO BOYS','/images/mr pinzas.jpeg','["Crust\u00e1ceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(25,'CHULAPOH BOY','Po’boy de calamares fritos con mayonesa de lima.',12.5,'PO BOYS','/images/chulapoh boy.jpeg','["Crust\u00e1ceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 13.75}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(26,'STEAK & CHIC','Mini pan brioche relleno de nuestro steak tartar con mayonesa de alcaparra y encurtidos (dos unidades)',12.5,'BRIOCHE','/images/steak and chick.jpeg','["L\u00e1cteos", "Mostaza", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(27,'SMOKY SALMON','Mini pan brioche relleno de salmón ahumado con crema de queso y eneldo acompañada de mousse de piparra (dos unidades)',13.5,'BRIOCHE','/images/smoky salmon.jpeg','["Pescado", "L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(28,'TARTA DE QUESO','Tarta de queso al estilo del norte con sirope de frutos rojos',6.75,'POSTRES','/images/tarta de queso.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(29,'B.B.BROWNIE','Brownie de chocolate con helado de vainilla.',6.5,'POSTRES',NULL,'["L\u00e1cteos", "Gluten", "Frutos de C\u00e1scara"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(30,'FUNKY BANANA','Postre de banana con un toque funky.',6.0,'POSTRES',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(31,'SALSA MAYO ALCAPARRA','Salsa cremosa de mayonesa con alcaparras.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(32,'SALSA CHEDDAR','Nuestra famosa salsa de queso cheddar fundido.',0.9,'SALSAS',NULL,'["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(33,'SALSA BACONESA','Mayonesa con sabor a bacon ahumado.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(34,'SALSA BBQ-PX','Salsa barbacoa con reducción de Pedro Ximénez.',0.9,'SALSAS',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(35,'SALSA MAYO-LIMA','Mayonesa cítrica con un toque de lima fresca.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(36,'SALSA HOT','Salsa picante para los valientes.',0.9,'SALSAS',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(37,'SALSA GOCHUMAYO','Fusión coreana de gochujang y mayonesa.',0.9,'SALSAS',NULL,'["Huevos", "Soja"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(38,'SALSA DIJONESA','Salsa de mostaza de Dijon y mayonesa.',0.9,'SALSAS',NULL,'["Mostaza", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(39,'CRISPY WINGS','Alitas MUY CRUJIENTES. Puedes elegir una de nuestras salsas como extra para mojar.',9.9,'ENTRANTES','/images/Wings.jpeg','["Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(40,'CHILI CHEESE BITES','Jalapeños rellenos de queso cheddar.',9.35,'ENTRANTES','/images/chili cheese bites.jpeg','["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(41,'CHICKEN CHURROS','Churros y fingers de pollo sobre salsa de queso de cabra y sirope de arce.',12.2,'ENTRANTES',NULL,'["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(42,'ONION RINGS','Aros de cebolla a la cerveza con nuestra salsa sureña especial.',10.0,'ENTRANTES',NULL,'["Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(43,'ALITAS DEL INFIERNO','Alitas crujientes para amantes del picante.',13.0,'ENTRANTES','/images/alitas infierno.jpeg','["L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(44,'ALITAS GARLIC PARMESAN','Nuestras tradicionales alitas con salsa garlic y espolvoreadas con queso parmesano',12.0,'ENTRANTES','/images/alitas garlic parmesan.jpeg','[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(45,'ALITAS BBQ PX','Alitas crujientes bañadas en nuestra salsa sureña especial.',11.0,'ENTRANTES','/images/alitas bbq px.jpeg','["Soja", "Gluten", "Di\u00f3xido de Azufre y Sulfitos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(46,'NACHOS GULAH','Nachos de maíz con birria de la casa, crema agria, guacamole y cebolla encurtida.',15.0,'ENTRANTES','/images/nachos gulah.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(47,'MAC AND CHEESE','El Auténtico Plato Americano: - Solos. - Con Chistorra. - Con Bacon - Con Pollo Crujiente.',9.9,'ENTRANTES','/images/mac and cheese.jpeg','["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(48,'PATATAS BRAVIOLI','Patatas fritas con salsa brava casera y alioli de ajo asado.',7.0,'PATATAS',NULL,'["Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(49,'PATATAS RANCHERAS','Patatas fritas con nuestra salsa ranchera, bacon crujiente y queso cheddar.',10.0,'PATATAS','/images/patatas rancheras.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(50,'HUEVOS RANCHEROS','Huevos de rancho, con patatas, huevos fritos y bacon cruquiente',12.0,'PATATAS','/images/huevos rancheros.jpeg','["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(51,'BRUTUS CHOICE','Ensalada en base de lechuga, pollo rebozado, salsa césar, bacon bits y queso parmesano.',12.5,'ENSALADAS','/images/brutus choice.jpeg','["Pescado", "L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(52,'GUACA-LOVER','Ensalada en base de mézclum con frijoles, maíz, guacamole, pico de gallo, crema agria y tiras de nachos crujientes.',10.0,'ENSALADAS','/images/guaca-lover.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(53,'HIGO & ROLL','Ensalada en base de canónigos, queso de cabra e higos confitados.',12.65,'ENSALADAS','/images/higo & roll.jpeg','["L\u00e1cteos", "Frutos de C\u00e1scara"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(54,'JAZZ BALLS','Po’boy de albóndigas de la nonna con salsa de tomate casera y queso de mozzarella.',12.5,'PO BOYS','/images/jazz balls.jpeg','["L\u00e1cteos", "Gluten"]','[{"name": "Normal", "price": 12.5}, {"name": "XL", "price": 14.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(55,'VODOO VEGGY','Po’boy vegetariano de seta ostra crujiente, lechuga, tomate y salsa remoulade (ojo pica).',12.5,'PO BOYS','/images/voodo veggie.jpeg','["Apio", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 13.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(56,'PHILLY CHEESESTEAK','Po Boy de lomo salteado a la plancha con cebolla y salsa de queso cheddar',12.5,'PO BOYS','/images/PHILLY CHEESESTEAK.jpeg','[]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 16.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(57,'TORO LOCO','Po’boy de rabo de toro guisado durante 24h con guacamole y cebolla encurtida.',12.5,'PO BOYS','/images/toro loco.jpeg','["Apio", "Gluten"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 14.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(58,'PULLED PORK','Po Boy de cerdo desmigado con ensalada de col, pepinillos y salsa bbq',12.5,'PO BOYS','/images/pulled pork.jpeg','[]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 15.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(59,'CHICKEN RUN','Po’boy de pollo frito con coleslaw y mayopicante.',12.0,'PO BOYS','/images/chicken run.jpeg','["Mostaza", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[{"name": "Regular", "price": 12.0}, {"name": "Large", "price": 12.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(60,'EGGS & GLORY','Po’boy de huevos rotos con chistorra y patatas fritas.',11.5,'PO BOYS','/images/eggs & glory.jpeg','["Gluten", "Huevos"]','[{"name": "Regular", "price": 11.5}, {"name": "Large", "price": 12.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(61,'THE SLOW BURN','Po’boy de costilla de ternera cocinada a baja temperatura y bañada en salsa bbq.',12.5,'PO BOYS','/images/the slow burn.jpeg','["L\u00e1cteos", "Gluten"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 15.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(62,'MR PINZAS','Po’boy frío de cangrejo estilo new orleans y salsa dijonesa.',12.5,'PO BOYS','/images/mr pinzas.jpeg','["Crust\u00e1ceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(63,'CHULAPOH BOY','Po’boy de calamares fritos con mayonesa de lima.',12.5,'PO BOYS','/images/chulapoh boy.jpeg','["Crust\u00e1ceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 13.75}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(64,'STEAK & CHIC','Mini pan brioche relleno de nuestro steak tartar con mayonesa de alcaparra y encurtidos (dos unidades)',12.5,'BRIOCHE','/images/steak and chick.jpeg','["L\u00e1cteos", "Mostaza", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(65,'SMOKY SALMON','Mini pan brioche relleno de salmón ahumado con crema de queso y eneldo acompañada de mousse de piparra (dos unidades)',13.5,'BRIOCHE','/images/smoky salmon.jpeg','["Pescado", "L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(66,'TARTA DE QUESO','Tarta de queso al estilo del norte con sirope de frutos rojos',6.75,'POSTRES','/images/tarta de queso.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(67,'B.B.BROWNIE','Brownie de chocolate con helado de vainilla.',6.5,'POSTRES',NULL,'["L\u00e1cteos", "Gluten", "Frutos de C\u00e1scara"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(68,'FUNKY BANANA','Postre de banana con un toque funky.',6.0,'POSTRES',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(69,'SALSA MAYO ALCAPARRA','Salsa cremosa de mayonesa con alcaparras.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(70,'SALSA CHEDDAR','Nuestra famosa salsa de queso cheddar fundido.',0.9,'SALSAS',NULL,'["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(71,'SALSA BACONESA','Mayonesa con sabor a bacon ahumado.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(72,'SALSA BBQ-PX','Salsa barbacoa con reducción de Pedro Ximénez.',0.9,'SALSAS',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(73,'SALSA MAYO-LIMA','Mayonesa cítrica con un toque de lima fresca.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(74,'SALSA HOT','Salsa picante para los valientes.',0.9,'SALSAS',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(75,'SALSA GOCHUMAYO','Fusión coreana de gochujang y mayonesa.',0.9,'SALSAS',NULL,'["Huevos", "Soja"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(76,'SALSA DIJONESA','Salsa de mostaza de Dijon y mayonesa.',0.9,'SALSAS',NULL,'["Mostaza", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(77,'CRISPY WINGS','Alitas MUY CRUJIENTES. Puedes elegir una de nuestras salsas como extra para mojar.',9.9,'ENTRANTES','/images/Wings.jpeg','["Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(78,'CHILI CHEESE BITES','Jalapeños rellenos de queso cheddar.',9.35,'ENTRANTES','/images/chili cheese bites.jpeg','["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(79,'CHICKEN CHURROS','Churros y fingers de pollo sobre salsa de queso de cabra y sirope de arce.',12.2,'ENTRANTES',NULL,'["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(80,'ONION RINGS','Aros de cebolla a la cerveza con nuestra salsa sureña especial.',10.0,'ENTRANTES',NULL,'["Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(81,'ALITAS DEL INFIERNO','Alitas crujientes para amantes del picante.',13.0,'ENTRANTES','/images/alitas infierno.jpeg','["L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(82,'ALITAS GARLIC PARMESAN','Nuestras tradicionales alitas con salsa garlic y espolvoreadas con queso parmesano',12.0,'ENTRANTES','/images/alitas garlic parmesan.jpeg','[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(83,'ALITAS BBQ PX','Alitas crujientes bañadas en nuestra salsa sureña especial.',11.0,'ENTRANTES','/images/alitas bbq px.jpeg','["Soja", "Gluten", "Di\u00f3xido de Azufre y Sulfitos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(84,'NACHOS GULAH','Nachos de maíz con birria de la casa, crema agria, guacamole y cebolla encurtida.',15.0,'ENTRANTES','/images/nachos gulah.jpeg','["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(85,'MAC AND CHEESE','El Auténtico Plato Americano: - Solos. - Con Chistorra. - Con Bacon - Con Pollo Crujiente.',9.9,'ENTRANTES',NULL,'["L\u00e1cteos", "Gluten"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(86,'PATATAS BRAVIOLI','Patatas fritas con salsa brava casera y alioli de ajo asado.',7.0,'PATATAS',NULL,'["Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(87,'PATATAS RANCHERAS','Patatas fritas con nuestra salsa ranchera, bacon crujiente y queso cheddar.',10.0,'PATATAS',NULL,'["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(88,'HUEVOS RANCHEROS','Huevos de rancho, con patatas, huevos fritos y bacon cruquiente',12.0,'PATATAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(89,'BRUTUS CHOICE','Ensalada en base de lechuga, pollo rebozado, salsa césar, bacon bits y queso parmesano.',12.5,'ENSALADAS',NULL,'["Pescado", "L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(90,'GUACA-LOVER','Ensalada en base de mézclum con frijoles, maíz, guacamole, pico de gallo, crema agria y tiras de nachos crujientes.',10.0,'ENSALADAS',NULL,'["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(91,'HIGO & ROLL','Ensalada en base de canónigos, queso de cabra e higos confitados.',12.65,'ENSALADAS',NULL,'["L\u00e1cteos", "Frutos de C\u00e1scara"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(92,'JAZZ BALLS','Po’boy de albóndigas de la nonna con salsa de tomate casera y queso de mozzarella.',12.5,'PO BOYS',NULL,'["L\u00e1cteos", "Gluten"]','[{"name": "Normal", "price": 12.5}, {"name": "XL", "price": 14.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(93,'VODOO VEGGY','Po’boy vegetariano de seta ostra crujiente, lechuga, tomate y salsa remoulade (ojo pica).',12.5,'PO BOYS',NULL,'["Apio", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 13.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(94,'PHILLY CHEESESTEAK','Po Boy de lomo salteado a la plancha con cebolla y salsa de queso cheddar',12.5,'PO BOYS',NULL,'[]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 16.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(95,'TORO LOCO','Po’boy de rabo de toro guisado durante 24h con guacamole y cebolla encurtida.',12.5,'PO BOYS',NULL,'["Apio", "Gluten"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 14.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(96,'PULLED PORK','Po Boy de cerdo desmigado con ensalada de col, pepinillos y salsa bbq',12.5,'PO BOYS',NULL,'[]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 15.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(97,'CHICKEN RUN','Po’boy de pollo frito con coleslaw y mayopicante.',12.0,'PO BOYS',NULL,'["Mostaza", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[{"name": "Regular", "price": 12.0}, {"name": "Large", "price": 12.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(98,'EGGS & GLORY','Po’boy de huevos rotos con chistorra y patatas fritas.',11.5,'PO BOYS',NULL,'["Gluten", "Huevos"]','[{"name": "Regular", "price": 11.5}, {"name": "Large", "price": 12.5}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(99,'THE SLOW BURN','Po’boy de costilla de ternera cocinada a baja temperatura y bañada en salsa bbq.',12.5,'PO BOYS',NULL,'["L\u00e1cteos", "Gluten"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 15.0}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(100,'MR PINZAS','Po’boy frío de cangrejo estilo new orleans y salsa dijonesa.',12.5,'PO BOYS',NULL,'["Crust\u00e1ceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(101,'CHULAPOH BOY','Po’boy de calamares fritos con mayonesa de lima.',12.5,'PO BOYS',NULL,'["Crust\u00e1ceos", "Pescado", "Mostaza", "Moluscos", "Gluten", "Huevos"]','[{"name": "Regular", "price": 12.5}, {"name": "Large", "price": 13.75}]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(102,'STEAK & CHIC','Mini pan brioche relleno de nuestro steak tartar con mayonesa de alcaparra y encurtidos (dos unidades)',12.5,'BRIOCHE',NULL,'["L\u00e1cteos", "Mostaza", "Gluten", "Huevos", "Di\u00f3xido de Azufre y Sulfitos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(103,'SMOKY SALMON','Mini pan brioche relleno de salmón ahumado con crema de queso y eneldo acompañada de mousse de piparra (dos unidades)',13.5,'BRIOCHE',NULL,'["Pescado", "L\u00e1cteos", "Gluten", "Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(104,'TARTA DE QUESO','Tarta de queso al estilo del norte con sirope de frutos rojos',6.75,'POSTRES',NULL,'["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(105,'B.B.BROWNIE','Brownie de chocolate con helado de vainilla.',6.5,'POSTRES',NULL,'["L\u00e1cteos", "Gluten", "Frutos de C\u00e1scara"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(106,'FUNKY BANANA','Postre de banana con un toque funky.',6.0,'POSTRES',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(107,'SALSA MAYO ALCAPARRA','Salsa cremosa de mayonesa con alcaparras.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(108,'SALSA CHEDDAR','Nuestra famosa salsa de queso cheddar fundido.',0.9,'SALSAS',NULL,'["L\u00e1cteos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(109,'SALSA BACONESA','Mayonesa con sabor a bacon ahumado.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(110,'SALSA BBQ-PX','Salsa barbacoa con reducción de Pedro Ximénez.',0.9,'SALSAS',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(111,'SALSA MAYO-LIMA','Mayonesa cítrica con un toque de lima fresca.',0.9,'SALSAS',NULL,'["Huevos"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(112,'SALSA HOT','Salsa picante para los valientes.',0.9,'SALSAS',NULL,'[]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(113,'SALSA GOCHUMAYO','Fusión coreana de gochujang y mayonesa.',0.9,'SALSAS',NULL,'["Huevos", "Soja"]','[]','[]',true,false,false);
INSERT INTO "menu_items" VALUES(114,'SALSA DIJONESA','Salsa de mostaza de Dijon y mayonesa.',0.9,'SALSAS',NULL,'["Mostaza", "Huevos"]','[]','[]',true,false,false);
CREATE TABLE reservations (
	id SERIAL PRIMARY KEY, 
	customer_name VARCHAR, 
	customer_email VARCHAR, 
	customer_phone VARCHAR, 
	date_time TIMESTAMP, 
	guests INTEGER, 
	status VARCHAR
);
CREATE TABLE site_configs (
	id SERIAL PRIMARY KEY, 
	"key" VARCHAR, 
	value JSONB
);
INSERT INTO "site_configs" VALUES(1,'contact_info','{"address": "Arturo Soria, 198, 28043, Madrid.", "phone": "+34 912 345 678", "email": "info@gulahpoboys.com", "reservation_email": "reservas@gulahpoboys.com", "hours": "Lunes a Viernes: 10 am - 24 pm | S\u00e1bados y Domingos: 13 pm - 24 pm"}');
INSERT INTO "site_configs" VALUES(2,'welcomeTitle','"EL PLACER ES NUESTRO"');
INSERT INTO "site_configs" VALUES(3,'welcomeSubtitle','"Bienvenido a Gulah, el templo de los aut\u00e9nticos Po''Boys. Aqu\u00ed cada bocado es una explosi\u00f3n sin filtros."');
INSERT INTO "site_configs" VALUES(4,'heroBtn1','{"text": "Ver la Carta", "link": "/menu", "style": "btn-primary"}');
INSERT INTO "site_configs" VALUES(5,'heroBtn2','{"text": "Reservar Mesa", "link": "/reservations", "style": "btn-secondary"}');
INSERT INTO "site_configs" VALUES(6,'eventsTitle','"JOURNAL GULAH"');
INSERT INTO "site_configs" VALUES(7,'eventsSubtitle','"Eventos, historias y el humo que nos une."');
INSERT INTO "site_configs" VALUES(8,'menuTitle','"NUESTRA CARTA"');
INSERT INTO "site_configs" VALUES(9,'menuSubtitle','"Explosi\u00f3n de sabores sin filtros. Sin excusas."');
INSERT INTO "site_configs" VALUES(10,'menuEmptyState','"Pr\u00f3ximamente... estamos cocinando algo grande."');
INSERT INTO "site_configs" VALUES(11,'reservationsTitle','"\u00bfTIENES HAMBRE DE FUEGO?"');
INSERT INTO "site_configs" VALUES(12,'reservationsSubtitle','"Reserva tu mesa y d\u00e9jate llevar por el sabor m\u00e1s salvaje."');
INSERT INTO "site_configs" VALUES(13,'reservationsBtn','{"text": "RESERVAR MESA", "link": "https://www.covermanager.com/reserve/module_restaurant/restaurante-gulah/spanish", "style": "btn-primary"}');
INSERT INTO "site_configs" VALUES(14,'reservationsPhone','"Tambi\u00e9n puedes llamarnos al +34 912 345 678"');
CREATE TABLE users (
	id SERIAL PRIMARY KEY, 
	username VARCHAR, 
	hashed_password VARCHAR, 
	is_admin BOOLEAN, 
	is_superuser BOOLEAN
);
INSERT INTO "users" VALUES(1,'arubio','$5$rounds=535000$Iv9xJeU7zffpZzNJ$I3eq7L3f3n9Ul96HrRFcf9Gf5N5tBYh.bTFcocqE1e6',true,true);
CREATE UNIQUE INDEX ix_users_username ON users (username);
CREATE INDEX ix_users_id ON users (id);
CREATE INDEX ix_menu_items_id ON menu_items (id);
CREATE INDEX ix_menu_items_name ON menu_items (name);
CREATE INDEX ix_reservations_id ON reservations (id);
CREATE INDEX ix_blog_posts_id ON blog_posts (id);
CREATE INDEX ix_site_configs_id ON site_configs (id);
CREATE UNIQUE INDEX ix_site_configs_key ON site_configs ("key");
COMMIT;
