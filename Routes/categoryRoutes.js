const router = require("express").Router();
const categoriesController = require("../Controllers/categoriesController");
const {
  getAllCategories,
  getBooksByCategory,
  filterCategories,
  getCategoryById,
  addCategory,
  updateCategory,
} = categoriesController;

router.get("/", getAllCategories);
router.get(":id/", getCategoryById);
router.get(":id/books/", getBooksByCategory);
router.get("search/", filterCategories);
router.post("new/", addCategory);
router.put(":id/edit/", updateCategory);
module.exports = router;
