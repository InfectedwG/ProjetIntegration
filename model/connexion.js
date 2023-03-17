import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


/**
 * Constante indiquant si la base de données existe au démarrage du serveur 
 * ou non.
 */
const IS_NEW = !existsSync(process.env.DB_FILE)

/**
 * Crée une base de données par défaut pour le serveur. Des données fictives
 * pour tester le serveur y ont été ajouté.
 */
const createDatabase = async (connectionPromise) => {
    let connection = await connectionPromise;

    await connection.exec(
        `
        CREATE TABLE IF NOT EXISTS Products(
            id integer PRIMARY KEY autoincrement,
            name text NOT NULL unique,
            price real not null,
            category_id integer NOT NULL,
            description text,
            smart_tips text,
            info text,
            features text,
            foreign key (category_id) references Categories(id));
                    
        CREATE TABLE IF NOT EXISTS Users(
            id integer primary key autoincrement,
            name text not null,
            address text,
            city text,
            postal_code text,
            province_state text,
            country text,
            email text not null unique,
            password text not null,
            access_id integer not null,
            foreign key (access_id) references Access(id));
        
        CREATE TABLE IF NOT EXISTS Access(
            id integer primary key,
            type text not null);
        
        CREATE TABLE IF NOT EXISTS Categories(
            id integer primary key autoincrement,
            name text not null,
            img_name text);
        
        CREATE TABLE IF NOT EXISTS Orders(
            id integer primary key autoincrement,
            user_id integer not null,
            subtotal real not null,
            date integer not null,
            foreign key (user_id) references Users(user_id));
        
        CREATE TABLE IF NOT EXISTS Order_Product(
            order_id integer primary key,
            product_id integer not null,
            quantity integer not null,
            foreign key (order_id) references Orders(order_id),
            foreign key (product_id) references product(product_id));
        
        CREATE TABLE IF NOT EXISTS Cart(
            id integer primary key autoincrement,
            user_id integer not null,
            subtotal real not null,
            foreign key (user_id) references Users(user_id));
            
        CREATE TABLE IF NOT EXISTS Cart_Items(
            cart_id integer primary key,
            product_id integer not null,
            quantity integer not null, 
            is_Selected integer not null,
            foreign key (cart_id) references Cart(cart_id),
            foreign key (product_id) references Products(product_id));
                        
        INSERT INTO Access (type) VALUES 
            ('user'),
            ('admin');
        
        INSERT INTO Users (name, address, city, postal_code, province_state, country, email, password, access_id) values
            ('Admin', null, null, null, null, null, 'admin@admin.com', 'admin', 2),
            ('John Doe', '123 1st avenue', 'Ottawa', 'A1B 0C3', 'ON', 'Canada', 'john_doe@gmail.com', 'password', 1);
        
        INSERT INTO Categories (name, img_name) VALUES 
            ('Dog products', 'category_dog.png'),
            ('Cat products', 'category_cat.png'),
            ('Other pet products', 'category_other.png'),
            ('Fish products', 'category_fish.png'),
            ('Bird products', 'category_bird.png'),
            ('Small animal products', 'category_small.png'),
            ('Reptile products', 'category_reptile.png'),
            ('Wild bird products', null);
                    
        INSERT INTO Products (name, price, category_id, description, smart_tips, info, features) 
            VALUES ('Pet bed', 29.99, 1, 'Comfortable and durable bed for your furry friend', 'Machine-washable cover', 
                    'Dimensions: 24" x 18"', 'Soft and cozy material, easy to assemble'),
                    
                    ('Cat scratching post', 15.99, 2, 'Helps keep your cat''s claws healthy and strong', 
                    'Includes a dangling toy for added fun', 'Dimensions: 18" x 10" x 10"', 'Sturdy base, easy to assemble'),
                    
                    ('Dog leash', 12.99, 3, 'Durable and strong leash for daily walks with your dog', 
                    'Reflective stitching for added safety at night', 'Length: 6 ft', 'Comfortable grip, available in multiple colors'),
                    
                    ('Pet carrier', 39.99, 1, 'Convenient carrier for transporting your pet', 
                    'Ventilated sides for breathability', 'Dimensions: 18" x 12" x 12"', 'Removable fleece bed, easy to clean'),
                    
                    ('Cat litter box', 24.99, 2, 'Easy-to-clean litter box for your cat', 
                    'Includes a scoop and a filter', 'Dimensions: 16" x 12" x 5"', 'Sturdy and durable design, available in multiple colors'),
                    
                    ('Dog food bowl', 8.99, 3, 'Non-slip bowl for your dog''s meals', 
                    'Made of high-quality stainless steel', 'Diameter: 8"', 'Easy to clean, available in multiple sizes'),
                    
                    ('Pet grooming brush', 9.99, 1, 'Gentle brush for grooming your pet''s fur', 
                    'Helps remove loose hair and prevent matting', 'Dimensions: 6" x 3"', 'Comfortable grip, suitable for all coat types'),
                    
                    ('Cat food dispenser', 19.99, 2, 'Automatic feeder for your cat''s meals', 
                    'Programmable timer and portion control', 'Capacity: 4.5 lbs', 'Easy to clean, runs on batteries');
        `
    );

    return connection;
}

// Base de données dans un fichier
let connectionPromise = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
if (IS_NEW) {
    connectionPromise = createDatabase(connectionPromise);
}

export default connectionPromise;