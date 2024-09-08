const router = require("express").Router();
const authController = require("../Controllers/authController");

router.post('/signup', authController.signup)
router.post('/login', authController.login)

module.exports = router;