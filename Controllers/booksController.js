const Database = require("../Database/Database");
const slugify = require("slugify");

// get all the books
const getBooks = async (req, res) => {
  const data = await Database.getFromTable("*", "book");
  res.json({ books: data });
};

// get one book using id
const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    data = await Database.getById("book", id);
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};

// add a book by putting data into the request body
const addBook = async (req, res) => {
  const { title, excerpt, duration, rating, image, author_id } = req.body;

  const slug = slugify(title, {
    lower: true,
  });

  const query = `INSERT INTO book (slug, title, excerpt, duration, rating, image, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [title, excerpt, duration, rating, image, author_id];

  try {
    data = await Database.insertData(query, values);
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};

// delete a book using id
const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    data = await Database.deleteById("book", id);
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};

// get all chapters of a book
const getChapters = async (req, res) => {
  const id = req.params.id;
  try {
    data = await Database.runAnyQuery(
      `SELECT * FROM book_chapters WHERE book_id = ${id}`
    );
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};

const getChapter = async (req, res) => {
  const id = req.params.id;
  const chapterno = req.params.no;
  try {
    data = await Database.runAnyQuery(
      `SELECT * FROM book_chapters WHERE book_id = ${id} and chapter_no = ${chapterno}`
    );
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};

// Insert chapter
const addChapter = async (req, res) => {
  const { title, audiourl, chapterno, text } = req.body;

  const bookid = req.params.id;
  const slug = slugify(title, {
    lower: true,
  });

  const query = `INSERT INTO book_chapters (slug, title, book_id, audio_url, chapter_no, text) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [slug, title, bookid, audiourl, chapterno, text];

  try {
    data = await Database.insertData(query, values);
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};

const deleteChapter = async (req, res) => {
  const chapterId = req.params.chpId;
  try {
    data = await Database.deleteById("book_chapters", chapterId);
    res.json({ message: "success", data: data });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure", data: error });
  }
};
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

// get the filtered books based on author OR title OR rating
// const getFilteredBooks = async (req, res) => {
//   const { author, title, rating } = req.query;
//   console.log(req.query);

//   const data = await Database.getFromMultipleTables(
//     "Books",
//     "Users",
//     "inner",
//     "Books.author_id=Users.id",
//     `${author ? `Users.name="${author}" and` : ""} ${
//       title ? `Books.title LIKE "%${title}%" and` : ""
//     } ${rating ? `cast(Books.rating as DECIMAL(2,1))>=${rating}` : ""}`,
//     "*"
//   );
//   res.json({ books: data });
// };

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  getChapters,
  getChapter,
  addChapter,
  deleteChapter,
  getBookCategories,
};
