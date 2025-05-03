const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
// const Database = require('./Database/Database');
const booksRoute = require('./Routes/booksRoute')
const usersRoute = require('./Routes/usersRoute')
const authRoute = require('./Routes/authRoute');
const cors = require('cors')
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => {
    res.json({message: "Welcome to Quiks!"})
})

app.use('/books', booksRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.listen(PORT, (req,res) => {
    console.log("Listening on PORT " + PORT);
})