const Database = require("../Database/Database");

// get all the books
const getBooks = async (req, res) => {
  const data = await Database.getFromTable("*", "Books");
  res.json({ books: data });
};

// get the filtered books based on author OR title OR rating
const getFilteredBooks = async (req, res) => {
  const { author, title, rating } = req.query;
  console.log(req.query);

  const data = await Database.getFromMultipleTables(
    "Books",
    "Users",
    "inner",
    "Books.author_id=Users.id",
    `${author ? `Users.name="${author}" and` : ""} ${
      title ? `Books.title LIKE "%${title}%" and` : ""
    } ${rating ? `cast(Books.rating as DECIMAL(2,1))>=${rating}` : ""}`,
    "*"
  );
  res.json({ books: data });
};

// get one book using id
const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    results = await Database.getById("books", id);
    res.json({ message: "success!", results: results });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure!", results: error });
  }
};

// add a book by putting data into the request body
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
    results = await Database.insertData(query, values);
    res.json({ message: "success!", results: results });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure!", results: error });
  }
};

// delete a book using id
const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    results = await Database.deleteById("books", id);
    res.json({ message: "success!", results: results });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure!", results: error });
  }
};

module.exports = { getBooks, addBook, getFilteredBooks, deleteBook, getBook };
