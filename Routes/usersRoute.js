const router = require("express").Router();
const usersController = require("../Controllers/usersController");

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/add", usersController.addUser);
router.delete("/:id/delete", usersController.deleteUser);

module.exports = router;
