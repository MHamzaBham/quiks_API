--   Currently made a book table using the query

CREATE TABLE Users (
    id INT UNIQUE AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    profile_pic VARCHAR(255),
    bio TEXT
)

CREATE TABLE Books (
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) UNIQUE,
    excerpt TEXT,
    rating FLOAT,
    duration INT,
    content TEXT,
    audio_data LONGBLOB,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES Users(id)
);


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
