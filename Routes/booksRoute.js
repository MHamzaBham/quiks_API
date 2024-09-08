const router = require("express").Router();
const booksController = require("../Controllers/booksController");

router.get("/", booksController.getBooks);
router.get("/:id", booksController.getBook);
router.post("/add", booksController.addBook);
router.delete("/delete/:id", booksController.deleteBook);
// router.get("/search", booksController.getFilteredBooks);

router.get('/:id/chapters', booksController.getChapters);
router.get('/:id/chapters/:no', booksController.getChapter);
router.post('/:id/chapters/add', booksController.addChapter);
router.delete('/:id/chapters/:chpId/delete', booksController.deleteChapter);
router.get("/:id/categories", booksController.getBookCategories);

module.exports = router;
