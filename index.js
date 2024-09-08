const dotenv = require("dotenv");
const express = require("express");
// const Database = require("./Database/Database");
const booksRoute = require("./Routes/booksRoute");
const categoriesRoutes = require("./Routes/categoryRoutes");
const usersRoute = require('./Routes/usersRoute')
const authRoute = require('./Routes/authRoute');
const cors = require('cors')
const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Quiks!" });
});

app.use("/books", booksRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use("categories/", categoriesRoutes);

app.listen(PORT, (req,res) => {
  console.log("Listening on PORT " + PORT);
});
