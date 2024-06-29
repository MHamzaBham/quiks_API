const Database = require("../Database/Database");
const slugify = require("slugify")

const getUsers = async (req, res) => {
    const data = await Database.getFromTable("*", "users");
    res.json({ users: data });
};

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        results = await Database.getById("book", id);
        res.json({ message: "success!", results: results });
    } catch (error) {
        console.log(error);
        res.json({ message: "failure!", results: error });
    }
};

// add a book by putting data into the request body
const addUser = async (req, res) => {
    const {
        name,
        email,
        age,
        profile_pic,
        bio,
    } = req.body;

    const query = `INSERT INTO users (name, email, age, profile_pic, bio) VALUES (?, ?, ?, ?, ?)`;
    const values = [
        name,
        email,
        age,
        profile_pic,
        bio,
    ];

    try {
        results = await Database.insertData(query, values);
        res.json({ message: "success!", results: results });
    } catch (error) {
        console.log(error);
        res.json({ message: "failure!", results: error });
    }
};

// delete a book using id
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        results = await Database.deleteById("users", id);
        res.json({ message: "success!", results: results });
    } catch (error) {
        console.log(error);
        res.json({ message: "failure!", results: error });
    }
};

module.exports = { getUsers, getUser, addUser, deleteUser };