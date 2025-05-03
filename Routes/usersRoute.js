const router = require("express").Router();
const usersController = require("../Controllers/usersController");
const { verifyToken } = require("../Controllers/authController");

// Protected routes
router.use(verifyToken);
router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.post("/", usersController.addUser);
router.put("/update", usersController.updateUser);

module.exports = router;
