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
        CREATE TABLE IF NOT EXISTS Addresses(
            id integer primary key autoincrement,
            street_address text not null,
            appartment text,
            city text not null,
            postal_code text not null,
            province_state text not null,
            country text not null);

        CREATE TABLE IF NOT EXISTS Products(
            id integer PRIMARY KEY autoincrement,
            name text NOT NULL unique,
            code integer not null unique,
            price real not null,
            category_id integer NOT NULL,
            availability int not null,
            description text,
            smart_tips text,
            info text,
            features text,
            foreign key (category_id) references Categories(id));
                    
        CREATE TABLE IF NOT EXISTS Users(
            id integer primary key autoincrement,
            first_name text not null,
            last_name text not null,            
            email text not null unique,
            password text not null,
            billing_address_id integer,
            shipping_address_id integer,
            access_id integer not null,
            foreign key (access_id) references Access(id),
            foreign key (billing_address_id) references Addresses(id),
            foreign key (shipping_address_id) references Addresses(id));

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
            shipping_fee real not null,
            total real not null,
            date integer not null,
            foreign key (user_id) references Users(user_id));
        
        CREATE TABLE IF NOT EXISTS Order_Product(
            id integer primary key autoincrement,
            order_id integer,
            product_id integer not null,
            quantity integer not null,
            foreign key (order_id) references Orders(id),
            foreign key (product_id) references Products(id));
        
        CREATE TABLE IF NOT EXISTS Cart(
            id integer primary key autoincrement,
            user_id integer not null,
            foreign key (user_id) references Users(id));
            
        CREATE TABLE IF NOT EXISTS Cart_Items(
            cart_id integer,
            product_id integer not null,
            quantity integer not null, 
            is_selected integer not null,
            foreign key (cart_id) references Cart(id),
            foreign key (product_id) references Products(id));
                        
        INSERT INTO Access (type) VALUES 
            ('user'),
            ('admin');
        
        INSERT INTO Addresses (street_address, appartment, city, postal_code, province_state, country)
        VALUES  ('456 6th avenue', NULL, 'Gatineau', 'J8E 8G1', 'QC', 'CA'),
                ('123 1st avenue', NULL, 'Ottawa', 'A1B 0C3', 'ON', 'CA');
        
        INSERT INTO Users (first_name, last_name, email, password, billing_address_id, shipping_address_id, access_id) values
            ('Mr.', 'Admin', 'admin@admin.com', 'admin', NULL, NULL, 2),
            ('John', 'Doe', 'john_doe@gmail.com', 'password', 2, 2, 1),
            ('test', 'user', 'test@test.com', '$2b$10$NFCbJqHCyt2o0zcDwkaOnOvvSVI7l7TK5xJofL05eUGvLjQeYzXma', 1, 1, 1);
        
        INSERT INTO Categories (name, img_name) VALUES 
            ('Dog products', 'category_dog.png'),
            ('Cat products', 'category_cat.png'),
            ('Other pet products', 'category_other.png'),
            ('Fish products', 'category_fish.png'),
            ('Bird products', 'category_bird.png'),
            ('Small animal products', 'category_small.png'),
            ('Reptile products', 'category_reptile.png'),
            ('Wild bird products', null);

        INSERT INTO Orders(user_id, shipping_fee, total, date)
            VALUES (3, 5.0, 25.0, "2022-03-01");

        INSERT INTO Order_Product(order_id, product_id, quantity)
            VALUES  (1, 1, 2),
                    (1, 2, 5);

                    
        INSERT INTO Products (name, code, price, category_id, availability, description, smart_tips, info, features) 
            VALUES  ('Pet bed', 3789, 29.99, 1, 1, 'Comfortable and durable bed for your furry friend', 'Machine-washable cover', 
                    'Dimensions: 24" x 18"', 'Soft and cozy material, easy to assemble'),
                    
                    ('Cat scratching post', 7953, 15.99, 2, 1, 'Helps keep your cat''s claws healthy and strong', 
                    'Includes a dangling toy for added fun', 'Dimensions: 18" x 10" x 10"', 'Sturdy base, easy to assemble'),
                    
                    ('Dog leash', 5794, 12.99, 3, 1, 'Durable and strong leash for daily walks with your dog', 
                    'Reflective stitching for added safety at night', 'Length: 6 ft', 'Comfortable grip, available in multiple colors'),
                    
                    ('Pet carrier', 7839, 39.99, 1, 0, 'Convenient carrier for transporting your pet', 
                    'Ventilated sides for breathability', 'Dimensions: 18" x 12" x 12"', 'Removable fleece bed, easy to clean'),
                    
                    ('Cat litter box', 4567, 24.99, 2, 1, 'Easy-to-clean litter box for your cat', 
                    'Includes a scoop and a filter', 'Dimensions: 16" x 12" x 5"', 'Sturdy and durable design, available in multiple colors'),
                    
                    ('Dog food bowl', 8094, 8.99, 3, 0, 'Non-slip bowl for your dog''s meals', 
                    'Made of high-quality stainless steel', 'Diameter: 8"', 'Easy to clean, available in multiple sizes'),
                    
                    ('Pet grooming brush', 5547, 9.99, 1, 1, 'Gentle brush for grooming your pet''s fur', 
                    'Helps remove loose hair and prevent matting', 'Dimensions: 6" x 3"', 'Comfortable grip, suitable for all coat types'),
                    
                    ('Cat food dispenser', 9937, 19.99, 2, 1, 'Automatic feeder for your cat''s meals', 
                    'Programmable timer and portion control', 'Capacity: 4.5 lbs', 'Easy to clean, runs on batteries');


        INSERT INTO Cart (user_id)
            VALUES  (2),
                    (3);

        INSERT INTO Cart_Items (cart_id, product_id, quantity, is_Selected)
            VALUES  (1, 1, 1, 1),
                    (1, 2, 2, 1),
                    (1, 3, 1, 0);
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