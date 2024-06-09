--   Currently made a book table using the query

-- User Tables
CREATE TABLE Users (
    id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    profile_pic VARCHAR(255),
    bio TEXT
)

CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

-- user can have many roles as user and author 
CREATE TABLE UserRoles (
    user_id INT
    role_id INT
    PRIMARY KEY (user_id, role_id)
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
)

CREATE TABLE Permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    permission_name VARCHAR(255) NOT NULL UNIQUE
);

-- a particular role can have many permissions
CREATE TABLE RolePermissions (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES Permissions(id) ON DELETE CASCADE
);
-- ON DELETE CASCADE is used to specify that when a row is deleted from the parent table, all rows in the child table that reference the deleted row should also be deleted.

--Also after cloning, make a .env file and copy env.example text to .env in your local machine

-- Book and its related tables

CREATE TABLE Book (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    excerpt VARCHAR(255),
    audio VARCHAR(255),
    duration INT,
    rating FLOAT,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Author(id) ON DELETE CASCADE -- one book can have one author
);

CREATE TABLE Author (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    no_of_books INT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Category (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE BookCategoryMapping (
    category_id INT NOT NULL,
    book_id INT NOT NULL,
    PRIMARY KEY (category_id, book_id),
    FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
);

CREATE TABLE Bookmark (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    date_time DATETIME NOT NULL,
    bookmark_text TEXT,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE RecentVisited (
    user_id INT NOT NULL,                         
    book_id INT NOT NULL    
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
);


CREATE TABLE Library (
    id INT PRIMARY KEY AUTO_INCREMENT,           
    user_id INT NOT NULL,                         
    book_id INT NOT NULL,
    library_name VARCHAR(255),           
    library_description TEXT,            
    privacy VARCHAR(50),      -- public, private etc..             
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
);

CREATE TABLE LibraryBooksMapping (
    library_id INT NOT NULL,           
    book_id INT NOT NULL,
    PRIMARY KEY (library_id,book_id)         
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
    FOREIGN KEY (library_id) REFERENCES Library(id) ON DELETE CASCADE
);


CREATE TABLE BookRating (
    user_id INT NOT NULL,           
    book_id INT NOT NULL,
    count FLOAT NOT NULL,
    PRIMARY KEY (user_id,book_id)         
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE Review (
    id INT PRIMARY KEY AUTO_INCREMENT,           
    user_id INT NOT NULL,                         
    book_id INT NOT NULL,                         
    review_text TEXT NOT NULL,                    
    date_time DATETIME NOT NULL,           
    likes_count INT,                    
    dislikes_count INT,                 
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE 
);






