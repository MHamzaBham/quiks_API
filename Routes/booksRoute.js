const router = require("express").Router();
const booksController = require("../Controllers/booksController");

router.get("/", booksController.getBooks);
router.post("/add", booksController.addBook);
router.post("/search", booksController.getFilteredBooks);

module.exports = router;
