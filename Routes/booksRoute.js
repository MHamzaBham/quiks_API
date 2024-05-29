const router = require('express').Router();
const booksController = require('../Controllers/booksController')

router.get('/', booksController.getBooks);

module.exports = router