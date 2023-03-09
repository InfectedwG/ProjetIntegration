import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { hash } from 'bcrypt';


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
        `CREATE TABLE IF NOT EXISTS Products(
            product_id integer PRIMARY KEY autoincrement,
            product_name text NOT NULL unique,
            product_price real not null,
            category_id integer NOT NULL,
            product_description text,
            product_smart_tips text,
            product_info text,
            product_features text);
                        
            CREATE TABLE IF NOT EXISTS Users(
            user_id integer primary key autoincrement,
            user_name text not null,
            user_address text,
            user_city text,
            user_postal_code text,
            user_province_state text,
            user_country text,
            user_email text not null unique,
            user_password text not null,
            user_access integer not null);
            
            CREATE TABLE IF NOT EXISTS User_Access(
            access_id integer primary key,
            access_type text not null);
            
            CREATE TABLE IF NOT EXISTS Categories(
            category_id integer primary key autoincrement,
            category_name text not null);
            
            CREATE TABLE IF NOT EXISTS Orders(
            order_id integer primary key autoincrement,
            customer_id integer not null,
            order_subtotal real not null,
            order_date integer not null,
            foreign key (customer_id) references Users(user_id));
            
            CREATE TABLE IF NOT EXISTS Order_Product(
            order_id integer primary key,
            product_id integer not null,
            quantity integer not null,
            foreign key (order_id) references Orders(order_id),
            foreign key (product_id) references product(product_id));
            
            CREATE TABLE IF NOT EXISTS Cart(
            cart_id integer primary key autoincrement,
            user_id integer not null,
            cart_subtotal real not null);
            
            CREATE TABLE IF NOT EXISTS Cart_Items(
            cart_id integer primary key,
            product_id integer not null,
            quantity integer not null, 
            is_Selected integer not null);
            
            INSERT INTO user_access (access_type) VALUES 
            ('user'),
            ('admin');
            
            INSERT INTO Users (user_name, user_address, user_city, user_postal_code, user_province_state, user_country, user_email, user_password, user_access) values
            ('Admin', null, 'admin@admin.com', 'admin', 2),
            ('John Doe', '123 1st avenue', 'Ottawa', 'A1B 0C3', 'ON', 'Canada', 'john_doe@gmail.com', 'password', 1);
            
            INSERT INTO Categories (category_name) values
            ('cat toys'),
            ('cat food'),
            ('cat beds'),
            ('cat litter'),
            ('cat litterboxes'),
            ('cat treats'),
            ('dog toys'),
            ('dog food'),
            ('dog beds'),
            ('dog leash'),
            ('dog collars'),
            ('dog treats');
            
            INSERT INTO Products (product_name, product_price, category_id, product_description, product_smart_tips, product_info, product_features) values
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy'),
            ('chew toy', 69.99, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore possimus nemo recusandae unde reprehenderit
                nesciunt adipisci in aliquam quis laborum, magnam deleniti dignissimos eveniet id facere quasi deserunt pariatur
                fuga!', 'in aliquam quis laborum, magnam deleniti dignissimos eveniet', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'can you make your aniaml happy');  
            
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