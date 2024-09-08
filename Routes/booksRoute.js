const router = require("express").Router();
const booksController = require("../Controllers/booksController");

router.get("/", booksController.getBooks);
router.get("/:id", booksController.getBook);
router.post("/add", booksController.addBook);
router.delete("/delete/:id", booksController.deleteBook);
router.get("/search", booksController.getFilteredBooks);
router.get("/:id/categories", booksController.getBookCategories);

module.exports = router;
