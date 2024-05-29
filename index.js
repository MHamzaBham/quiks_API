const dotenv = require('dotenv')
const express = require('express');
const Database = require('./Database/Database');
const booksRoute = require('./Routes/booksRoute')
const app = express();

app.use(express.json());
dotenv.config()

const PORT = process.env.PORT || 5001

app.get('/', (req, res) => {
    res.json({message: "Welcome to Quiks!"})
})

app.use('/books', booksRoute);

app.listen(PORT, () => {
    console.log("Listening on PORT " + PORT);
})