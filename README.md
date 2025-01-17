# Express.js Authentication API

This is a simple authentication API built with Express.js. It provides endpoints for user login and registration, using bcrypt for password hashing and JWT for token-based authentication.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Ensure you have a running MySQL database.
2. Start the server:
    ```bash
    npm start
    ```
3. The server will be running on `http://localhost:3001`.

## Database Setup

1. Create a MySQL database:
    ```sql
    CREATE DATABASE your_database_name;
    ```
2. Create a table for user information:
    ```sql
    CREATE TABLE login_info (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        age INT,
        DOB DATE,
        gender CHAR(1)
    );
    ```
3. Update the `databaseconnection.js` file with your database credentials:
    ```javascript
    const mysql = require('mysql');

    const Db = mysql.createConnection({
        host: 'your_database_host',
        user: 'your_database_user',
        password: 'your_database_password',
        database: 'your_database_name'
    });

    module.exports = Db;
    ```
4. Ensure the database is connected when the server starts:
    ```javascript
    const Db = require('./databaseconnection');

    Db.connect((error) => {
        if (error) throw error;
        console.log("Database is connected");
    });
    ```

## API Endpoints

### Login

- **URL**: `/login_page`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "userpassword"
    }
    ```
- **Responses**:
    - Success: 
        ```json
        {
            "message": "Login Successful",
            "data": { ...userData },
            "token": "jwtToken",
            "status": 200
        }
        ```
    - Invalid Password:
        ```json
        {
            "message": "Password is incorrect"
        }
        ```
    - Invalid Email:
        ```json
        {
            "message": "Invalid Email ID"
        }
        ```

### Register

- **URL**: `/register_page`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "userpassword",
        "name": "username",
        "phone_number": "1234567890",
        "age": 25,
        "DOB": "1999-01-01",
        "gender": "M"
    }
    ```
- **Responses**:
    - Success:
        ```json
        {
            "message": "User Registered Successfully",
            "data": { ...newUserData },
            "status": 200
        }
        ```
    - Email Exists:
        ```json
        {
            "message": "Email already exists"
        }
        ```

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request.

## License

This project is licensed under the MIT License.
#   B a c k e n d - w e b s i t e -  
 