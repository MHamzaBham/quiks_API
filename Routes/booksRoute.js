const router = require("express").Router();
const booksController = require("../Controllers/booksController");

router.get("/", booksController.getBooks);
router.get('/:id', booksController.getBook);
router.post("/search", booksController.getFilteredBooks);
router.post("/add", booksController.addBook);
router.delete('/delete/:id', booksController.deleteBook);

module.exports = router;
