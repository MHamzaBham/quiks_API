const Database = require("../Database/Database");

const getBooks = async (req, res) => {
  const data = await Database.getFromTable("*", "Books");
  res.json({ books: data });
};

const getFilteredBooks = async (req, res) => {
  const { author, title, rating } = req.body;
  console.log(req);
  console.log(req.params);
  const data = await Database.getFromMultipleTables(
    "Books",
    "Users",
    "inner",
    "Books.author_id=Users.id",
    `Users.name="${author}" and Books.title="${title}" and cast(Books.rating as DECIMAL(2,1))=${rating}`,
    "*"
  );
  res.json({ books: data });
};

const addBook = async (req, res) => {
  const {
    title,
    aboutTheBook,
    averageRating,
    content,
    readingDuration,
    audioUrl,
  } = req.body;
  const query = `INSERT INTO books (title, excerpt, rating, duration, content, audio_data) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    title,
    aboutTheBook,
    averageRating,
    readingDuration,
    content,
    audioUrl,
  ];

  try {
    results = Database.insertData(query, values);
    console.log(results);
    res.json({ message: "success!", results: results });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure!", results: error });
  }
};

module.exports = { getBooks, addBook, getFilteredBooks };
