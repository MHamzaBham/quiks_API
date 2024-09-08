-- User Tables
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    profile_pic VARCHAR(255),
    bio TEXT
);

CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

-- user can have many roles as user and author 
CREATE TABLE UserRoles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
);

CREATE TABLE Permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
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

-- Book and its related tables
CREATE TABLE Author (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    no_of_books INT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt VARCHAR(255),
    duration INT,
    rating FLOAT,
    image VARCHAR(255),
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES Author(id) ON DELETE CASCADE
);

CREATE TABLE Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    date_time DATETIME NOT NULL,
    bookmark_text TEXT,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE RecentVisited (
    user_id INT NOT NULL,                         
    book_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
);

CREATE TABLE Library (
    id INT AUTO_INCREMENT PRIMARY KEY,           
    user_id INT NOT NULL,                         
    book_id INT NOT NULL,
    library_name VARCHAR(255),           
    library_description TEXT,            
    privacy VARCHAR(50),                   
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
);

CREATE TABLE LibraryBooksMapping (
    library_id INT NOT NULL,           
    book_id INT NOT NULL,
    PRIMARY KEY (library_id, book_id),         
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (library_id) REFERENCES Library(id) ON DELETE CASCADE
);

CREATE TABLE BookRating (
    user_id INT NOT NULL,           
    book_id INT NOT NULL,
    count FLOAT NOT NULL,
    PRIMARY KEY (user_id, book_id),         
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE Review (
    id INT AUTO_INCREMENT PRIMARY KEY,           
    user_id INT NOT NULL,                         
    book_id INT NOT NULL,                         
    review_text TEXT NOT NULL,                    
    date_time DATETIME NOT NULL,           
    likes_count INT,                    
    dislikes_count INT,                 
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE 
);

CREATE TABLE book_chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    book_id INT NOT NULL,
    audio_url VARCHAR(255),
    chapter_no INT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE
);



-- data insertion

-- USER DATA INSERTION
INSERT INTO users (name, email, age, profile_pic, bio) VALUES
('Guy Raz', 'guy.raz@example.com', 45, 'guyraz.jpg', 'Journalist Guy Raz is the host of How I Built This, a National Public Radio program on which he interviews successful entrepreneurs about their paths to success. He is also the creator or cocreator of four other programs; collectively, his shows are heard by 19 million people per month.'),
('Sunny Bonnell', 'sunny.bonnell@example.com', 38, 'sunnybonnell.jpg', 'Sunny Bonnell is the founders of Motto, an award-winning digital branding agency. Their dynamic approach to business has netted them positive coverage everywhere from the Chicago Tribune and Forbes to the Huffington Post and the Wall Street Journal.'),
('Gino Wickman', 'gino.wickman@example.com', 50, 'ginowickman.jpg', 'Gino Wickman is a business consultant and author widely recognized for his expertise in entrepreneurship and business management strategies. He created the Entrepreneurial Operating System (or EOS), a practical method for helping companies achieve increased success. Among Wickman’s other best-selling books is Traction, which provides a comprehensive guide for business leaders looking to implement EOS effectively in their organizations.'),
('Paul Osincup', 'paul.osincup@example.com', 42, 'paulosincup.jpg', 'Paul Osincup is a speaker and workplace culture expert known for his keynote speeches and workshops on the benefits of humor and positivity. He has worked with various organizations, including Cisco, Google, and the U.S. Air Force, to improve team dynamics and employee well-being through humor strategies. Osincup’s work has been featured in Forbes, the New York Times, and on the TEDx stage.'),
('Darin Olien', 'darin.olien@example.com', 48, 'darinolien.jpg', 'Darin Olien is a renowned nutritionist, supplement formulator, and the mastermind behind the popular Shakeology line of health shakes. He’s best known for co-hosting the Netflix series Down to Earth with Zac Efron, as well as for his top-ranked podcast, the Darin Olien Show. He’s also made a name for himself as an exotic superfood hunter who visits indigenous communities around the world in search of little-known plants with superfood potential.'),
('Shane O\'Mara', 'shane.omara@example.com', 55, 'shaneomara.jpg', 'Neuroscientist Shane O’Mara is Professor of Experimental Brain Research at Trinity College Dublin. He is the Principal Investigator at the college’s Institute of Neuroscience and is also a Wellcome Trust Senior Investigator. His previous books are Why Torture Doesn’t Work: The Neuroscience of Interrogation and A Brain for Business – A Brain for Life.'),
('Judith Orloff', 'judith.orloff@example.com', 60, 'judithorloff.jpg', 'Judith Orloff is a renowned psychiatrist and an empath who integrates traditional medicine with intuition and spirituality in her work. She is a New York Times best-selling author known for her books The Empath’s Survival Guide and Emotional Freedom. Orloff’s expertise lies in her unique approach to mental health, combining scientific knowledge with holistic practices to promote overall well-being.'),
('Mark Stephens', 'mark.stephens@example.com', 44, 'markstephens.jpg', 'Mark Stephens is a renowned yoga instructor and author who has dedicated his career to helping people overcome insomnia and sleep issues through the practice of yoga.'),
('Shaman Durek', 'shaman.durek@example.com', 39, 'shamandurek.jpg', 'Shaman Durek is a sixth-generation shaman and best-selling author. Durek’s work has been featured in publications including Elle and Marie Claire magazines, and his teachings have influenced leading public figures such as Gwyneth Paltrow and Nina Dobrev.'),
('Laura Vanderkam', 'laura.vanderkam@example.com', 36, 'lauravanderkam.jpg', 'Laura Vanderkam is an author, podcaster, and productivity expert. Her acclaimed advice books on time management include titles like Off the Clock and What the Most Successful People Do Before Breakfast.'),
('Benjamin Hardy', 'benjamin.hardy@example.com', 34, 'benjaminhardy.jpg', 'Benjamin Hardy is a best-selling author and organizational psychologist with a PhD from Clemson University. His work has been featured in Forbes, Fortune, and Psychology Today. He is also the author of Personality Isn\'t Permanent.'),
('Michael Todd', 'michael.todd@example.com', 37, 'michaeltodd.jpg', 'Michael Todd is the lead pastor of Transformation Church in Tulsa, Oklahoma. He speaks at a variety of churches, events, and conferences each year, including Elevation Church, C3 Conference, and Lakewood Church. Todd is also a proud husband, father to three children, and relationship counselor to his congregation.'),
('John Gray', 'john.gray@example.com', 69, 'johngray.jpg', 'John Gray, PhD, is a popular speaker and author. He has written over 20 books about relationships, and has appeared on Oprah, The Dr. Oz Show, Good Morning America, The Today Show, and many more.'),
('Mark Groves', 'mark.groves@example.com', 41, 'markgroves.jpg', 'Mark Groves is a speaker, writer, and the founder of relationship education platform Create the Love. He also hosts The Mark Groves Podcast.'),
('David E. Sanger', 'david.sanger@example.com', 63, 'davidsanger.jpg', 'David E. Sanger is the national security correspondent for the New York Times and the best-selling author of The Inheritance and Confront and Conceal. He regularly contributes to CNN and also teaches national security policy at Harvard’s Kennedy School of Government. Sanger has won the Pulitzer Prize three times.'),
('Yamamoto Tsunetomo', 'yamamoto.tsunetomo@example.com', 55, 'yamamototsunetomo.jpg', 'Yamamoto Tsunetomo was a Japanese samurai of the early 18th century, best known for his insights into bushido, the samurai code of conduct. After his lord passed away in 1700, Tsunetomo became a monk, retiring to a hermitage in Kurotsuchibaru. Tsunetomo’s contributions have left a lasting legacy on Japanese culture and the broader philosophical discourse on ethics and morality.'),
('Mark Twain', 'mark.twain@example.com', 74, 'marktwain.jpg', 'Mark Twain, born as Samuel Clemens, is a celebrated figure in the world of American literature, known for his impeccable storytelling abilities that have resonated with readers across generations. His works, characterized by his distinct wit and satirical style, depict powerful images of human nature and society, often challenging the status quo. Other notable works include The Adventures of Tom Sawyer (1876) and Adventures of Huckleberry Finn (1884).'),
('Daniel Coyle', 'daniel.coyle@example.com', 46, 'danielcoyle.jpg', 'Daniel Coyle is a journalist and expert on skills acquisition and talent. He’s worked with professional sports teams, schools, and military special forces, and he’s also written for publications like Sports Illustrated and the New York Times Magazine. His books include The Talent Code, Hardball, and the New York Times best-seller Lance Armstrong’s War.'),
('Carl Benedikt Frey', 'carl.frey@example.com', 38, 'carlfrey.jpg', 'Carl Benedikt Frey is a Swedish-German economist, economic historian, and author. He serves as the Dieter Schwarz Associate Professor of AI & Work at the Oxford Internet Institute and is the director of the Future of Work program at the Oxford Martin School.'),
('Ethan Mollick', 'ethan.mollick@example.com', 40, 'ethanmollick.jpg', 'Ethan Mollick is an associate professor who teaches innovation and entrepreneurship at the Wharton School of the University of Pennsylvania. A startups expert, Mollick has penned several renowned management papers, as well as authoring the book The Unicorn’s Shadow: Combating the Dangerous Myths that Hold Back Startups.'),
('Kate Crawford', 'kate.crawford@example.com', 44, 'katecrawford.jpg', 'Kate Crawford is an author and scholar who studies the social implications of AI. She has held research positions at the USC Annenberg School, Microsoft Research, and the École Normale Supérieure.'),
('Dana Mattioli', 'dana.mattioli@example.com', 35, 'danamattioli.jpg', 'Dana Mattioli is an accomplished journalist who has been with The Wall Street Journal since 2006. She has covered a range of high-profile topics including mergers and acquisitions, and more recently, investigative pieces on Amazon. Mattiolis work has earned her several prestigious awards, including the Gerald Loeb Award for Breaking News in 2016 and for Beat Reporting in 2021, as well as the WERT Prize for business journalism in 2021.'),
('Henrik Fexeus', 'henrik.fexeus@example.com', 43, 'henrikfexeus.jpg', 'Henrik Fexeus is a renowned mentalist, author, and speaker from Sweden who has captivated audiences around the world with his extraordinary ability to read minds, and influence thoughts and behaviors. Through his books and live performances, Fexeus shares insights from psychology and mentalism to teach others how to decipher nonverbal cues, understand hidden emotions, and persuade effectively.'),
('Eric Kapitulik', 'eric.kapitulik@example.com', 49, 'erickapitulik.jpg', 'Eric Kapitulik, founder and CEO of The Program, served as a marine infantry officer and special operations officer with 1st Force Reconnaissance Company, 1st Marine Division. An ultra-endurance athlete and high-altitude mountaineer, he has summited Mt. Everest and completed numerous Ironman Triathlons.');



-- AUTHOR DATA INSERSION
-- Insert sample data into 'author' table with default values for unspecified fields
INSERT INTO author (user_id, no_of_books)
VALUES
    (1, 0),
    (2, 0),
    (3, 0),
    (4, 0),
    (5, 0),
    (6, 0),
    (7, 0),
    (8, 0),
    (9, 0),
    (10, 0),
    (11, 0),
    (12, 0),
    (13, 0),
    (14, 0),
    (15, 0),
    (16, 0),
    (17, 0),
    (18, 0),
    (19, 0),
    (20, 0),
    (21, 0),
    (22, 0),
    (23, 0),
    (24, 0);

-- Book data insertion.

INSERT INTO book (slug, title, excerpt, duration, rating, image, author_id) VALUES
('how-i-built-this', 'How I Built This', 'The Unexpected Paths to Success from the World’s Most Inspiring Entrepreneurs', 16, 4.3, 'https://images.blinkist.io/images/books/5f802b3b6cee07000646ad41/1_1/470.jpg', 1),
('rare-breed', 'Rare Breed', 'A Guide to Success for the Defiant, Dangerous, and Different', 14, 4.2, 'https://images.blinkist.io/images/books/5f359f7e6cee0700065032a6/1_1/470.jpg', 2),
('rocket-fuel', 'Rocket Fuel', 'The One Essential Combination That Will Get You More of What You Want from Your Business', 14, 3.8, 'https://images.blinkist.io/images/books/6669aae36baa0e0008df344a/1_1/470.jpg', 3),
('the-humor-habit', 'The Humor Habit', 'Rewire Your Brain to Stress Less, Laugh More, and Achieve More\'er', 15, 4.3, 'https://images.blinkist.io/images/books/66598ac581aa110007c1ca1e/1_1/470.jpg', 4),
('superlife', 'SuperLife', 'The 5 Simple Fixes That Will Make You Healthy, Fit, and Eternally Awesome', 19, 4.2, 'https://images.blinkist.io/images/books/5f6dcd536cee070006551da5/1_1/470.jpg', 5),
('in-praise-of-walking', 'In Praise of Walking', 'The new science of how we walk and why it’s good for us', 19, 4.5, 'https://images.blinkist.io/images/books/5f69192d6cee070006a72d07/1_1/470.jpg', 6),
('the-genius-of-empathy', 'The Genius of Empathy', 'Practical Skills to Heal Your Sensitive Self, Your Relationships, and the World', 15, 4, 'https://images.blinkist.io/images/books/666056ed27a9400007dfabad/1_1/470.jpg', 7),
('yoga-for-better-sleep', 'Yoga for Better Sleep', 'Ancient Wisdom Meets Modern Science', 15, 4.4, 'https://images.blinkist.io/images/books/666069da0fc3570007215aea/1_1/470.jpg', 8),
('spirit-hacking', 'Spirit Hacking', 'Shamanic Keys to Reclaim Your Personal Power, Transform Yourself, and Light Up the World', 21, 4, 'https://images.blinkist.io/images/books/5f5be1e76cee070006c62e0b/1_1/470.jpg', 9),
('the-new-corner-office', 'The New Corner Office', 'How the Most Successful People Work from Home', 13, 4.1, 'https://images.blinkist.io/images/books/5f51585d6cee070006084498/1_1/470.jpg', 10),
('willpower-doesnt-work', 'Willpower Doesn\'t Work', 'Discover the Hidden Keys to Success', 18, 4.3, 'https://images.blinkist.io/images/books/5f10bce56cee0700066c457c/1_1/470.jpg', 11),
('relationship-goals', 'Relationship Goals', 'How to Win at Dating, Marriage, and Sex', 23, 3, 'https://images.blinkist.io/images/books/5f69c26a6cee070006a73185/1_1/470.jpg', 12),
('men-are-from-mars-women-are-from-venus', 'Men Are from Mars, Women Are from Venus', 'A Practical Guide for Improving Communication and Getting What You Want in Your Relationships', 20, 4.5, 'https://images.blinkist.io/images/books/5f35ae726cee07000600528a/1_1/470.jpg', 13),
('liberated-love', 'Liberated Love', 'Release Codependent Patterns and Create the Love You Desire', 16, 3.9, 'https://images.blinkist.io/images/books/665590aaf30d5d000d3d16d7/1_1/470.jpg', 14),
('new-cold-wars', 'New Cold Wars', 'China\'s Rise, Russia\'s Invasion, and America\'s Struggle to Defend the West', 15, 3.3, 'https://images.blinkist.io/images/books/665584a88b9f7700072f7e4e/1_1/470.jpg', 15),
('hagakure', 'Hagakure', 'The Secret Wisdom of the Samurai', 10, 4.3, 'https://images.blinkist.io/images/books/662f2d7b195d960008e29e9f/1_1/470.jpg', 16),
('the-prince-and-the-pauper', 'The Prince and the Pauper', 'A Tale of Two Mirrored Fates', 15, 4.6, 'https://images.blinkist.io/images/books/66052db9da28860008b52783/1_1/470.jpg', 17),
('the-little-book-of-talent', 'The Little Book of Talent', '52 Tips for Improving Your Skills', 16, 4.4, 'https://images.blinkist.io/images/books/5f23e8c16cee070006bddbd4/1_1/470.jpg', 18),
('the-technology-trap', 'The Technology Trap', 'Capital, Labor, and Power in the Age of Automation', 14, 3.6, 'https://images.blinkist.io/images/books/66474e4e777f9d00070fb78c/1_1/470.jpg', 19),
('co-inteligence', 'Co inteligence', 'Living and Working with AI', 16, 4.3, 'https://images.blinkist.io/images/books/663b4e4c195d960008e2c08f/1_1/470.jpg', 20),
('atlas-of-ai', 'Atlas of AI', 'Power, Politics, and the Planetary Costs of Artificial Intelligence', 15, 3.6, 'https://images.blinkist.io/images/books/664dff5175211d00063caa02/1_1/470.jpg', 21),
('the-everything-war', 'The Everything War', 'Amazon\'s Ruthless Quest to Own the World and Remake Corporate Power', 20, 4, 'https://images.blinkist.io/images/books/6662b3776507960013fdc2e8/1_1/470.jpg', 22),
('the-art-of-reading-minds', 'The Art of Reading Minds', 'Understand Others to Get What You Want', 15, 4.1, 'https://images.blinkist.io/images/books/66699e0687f3050008ba7c6a/1_1/470.jpg', 23),
('the-program', 'The Program', 'Lessons From Elite Military Units for Creating and Sustaining High Performance Leaders and Teams', 16, 4, 'https://images.blinkist.io/images/books/6669b2cc6baa0e0008df3452/1_1/470.jpg', 24);



CREATE TABLE shares (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    Recipient_id INT NOT NULL,
    Message TEXT,
    book_id INT,
    library_id INT,
    date_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (library_id) REFERENCES Library(id) ON DELETE CASCADE
)