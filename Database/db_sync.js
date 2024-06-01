// Currently made a book table using the query

// CREATE TABLE Users (
//     id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,             
//     name VARCHAR(255) NOT NULL,          
//     email VARCHAR(255) UNIQUE NOT NULL,  
//     age INT,                             
//     profile_pic VARCHAR(255),            
//     bio TEXT                            
// )

// CREATE TABLE Books (
//     id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) UNIQUE,
//     excerpt TEXT,
//     rating FLOAT, 
//     duration INT,
//     content TEXT,
//     audio_data LONGBLOB,
//     author_id INT,
//     FOREIGN KEY (author_id) REFERENCES Users(id)
// );


// Also after cloning, make a .env file and copy env.example text to .env in your local machine