DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT, -- (unique id for each product)
    product_name VARCHAR(100) NULL, -- (Name of product)
    department_name VARCHAR(100) NULL, 
    price DECIMAL(10,4) NULL, -- (cost to customer)
    stock_quantity INT(10) NULL, -- (how much of the product is available in stores)
	PRIMARY KEY (item_id)
);


INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("watering can","Garden & Outdoor",12.99,4), 
    ("Exploding Kittens game","Toy & Games",13.99,5), 
    ("Philips Viva Airfryer","Home & Kitchen",84.99,6),
    ("Microsoft Office Home and Student 2019 Download","Software",31.99,7),
    ("Tripe Wave Thermal Insulated Ring Top Blackout Window Curtains","Home & Kitchen",20.50,4),
    ("BURN-XT Thermogenic Fat Burner","Health & Household",17.67,5),
    ("Hausbell Camcorder with Wifi","Electronics",86.99,6),
    ("Oalka Women Power Flex Yoga Pants","Sports & Outdoors",18.99,7),
    ("TORRAS Magnetic Car Mount","Cell Phones & Accessories",10.00,8),
    ("Kungroo Airtight Glass Cold Brew Iced Coffee Maker","Home & Kitchen",32.15,3);