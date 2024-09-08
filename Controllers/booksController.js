const Database = require("../Database/Database");
const slugify = require("slugify");

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

  const slug = slugify(title, {
    lower: true,
  });
  console.log(slug);

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
// get all categories of a book
const getBookCategories = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "No Book id is provided" });
    }
    const data = await Database.getFromTable(
      "*",
      "bookcategorymapping",
      `WHERE book_id=${id}`
    );
    if (!data || data.length === 0) {
      res.status(404).json({ message: "No Categories of this Book" });
    }
    res.status(200).json({ categories: data });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getBooks,
  addBook,
  getFilteredBooks,
  deleteBook,
  getBook,
  getBookCategories,
};
