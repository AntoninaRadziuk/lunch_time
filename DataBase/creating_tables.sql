DROP TABLE Lunch_components;
DROP TABLE Lunch_offerts;
DROP TABLE Kitchen_types;
DROP TABLE Favorite_restaurants;
DROP TABLE Restaurants;
DROP TABLE Clients;
DROP TABLE Accounts;



CREATE TABLE Accounts (
    Account_id INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Account_Type ENUM('Client', 'Restaurant') NOT NULL,
    PRIMARY KEY (Account_id, Email)
);

CREATE TABLE Clients (
	Account_id INT NOT NULL,
    Client_Id INT NOT NULL AUTO_INCREMENT,
    Stamps_counter INT NOT NULL DEFAULT '0',
    PRIMARY KEY (Client_Id),
    FOREIGN KEY (Account_id) REFERENCES Accounts(Account_id)
);

CREATE TABLE Restaurants (
	Account_id INT NOT NULL,
    Restaurant_Id INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(30) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    Lunch_start_time VARCHAR(4) NOT NULL,
    Lunch_end_time VARCHAR(4) NOT NULL,
    Website_address VARCHAR(50) NOT NULL,
    PRIMARY KEY (Restaurant_Id),
    FOREIGN KEY (Account_id) REFERENCES Accounts(Account_id)
);

CREATE TABLE Favorite_restaurants (
    Client_Id INT NOT NULL,
    Restaurant_Id INT NOT NULL,
    FOREIGN KEY (Client_Id) REFERENCES Clients(Client_Id),
    FOREIGN KEY (Restaurant_Id) REFERENCES Restaurants(Restaurant_Id)
);

CREATE TABLE Kitchen_types (
    Restaurant_Id INT NOT NULL,
    Type_of_kitchen VARCHAR(20) NOT NULL,
    PRIMARY KEY (Type_of_kitchen, Restaurant_Id),
    FOREIGN KEY (Restaurant_Id) REFERENCES Restaurants(Restaurant_Id)
);

CREATE TABLE Lunch_offerts (
    Lunch_id INT NOT NULL AUTO_INCREMENT,
    Restaurant_Id INT NOT NULL,
    Date VARCHAR(20) NOT NULL,
    Soup_price DECIMAL,
    Dish_price DECIMAL NOT NULL,
    Set_price DECIMAL,
    Set_and_drink_price DECIMAL,
    PRIMARY KEY (Lunch_id, Date, Restaurant_Id),
    FOREIGN KEY (Restaurant_Id) REFERENCES Restaurants(Restaurant_Id)
);

CREATE TABLE Lunch_components (
    Lunch_component_id INT NOT NULL AUTO_INCREMENT,
    Lunch_id INT NOT NULL,
    Component_type ENUM('Soup', 'Dish', 'Drink') NOT NULL,
    Component_name VARCHAR(20),
    PRIMARY KEY (Lunch_component_id),
    FOREIGN KEY (Lunch_id) REFERENCES Lunch_offerts(Lunch_id)
);