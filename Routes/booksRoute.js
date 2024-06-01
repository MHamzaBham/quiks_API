const router = require("express").Router();
const booksController = require("../Controllers/booksController");

router.get("/", booksController.getBooks);
router.get('/:id', booksController.getBook);
router.post("/add", booksController.addBook);
router.delete('/delete/:id', booksController.deleteBook);
router.post("/search/:author/:title/:rating", booksController.getFilteredBooks);

module.exports = router;
