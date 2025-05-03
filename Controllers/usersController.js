const Database = require("../Database/Database");
const slugify = require("slugify");

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

const updateUser = async (req, res) => {
    const userId = req.user.userId; // From verifyToken middleware
    const {
        firstName,
        lastName,
        email,
        profession,
        bio,
        profilePicUrl
    } = req.body;

    try {
        // Build update query dynamically based on provided fields
        let updateFields = [];
        let values = [];
        
        if (firstName && lastName) {
            updateFields.push('name = ?');
            values.push(`${firstName} ${lastName}`);
        }
        if (email) {
            updateFields.push('email = ?');
            values.push(email);
        }
        if (profession) {
            updateFields.push('profession = ?');
            values.push(profession);
        }
        if (bio) {
            updateFields.push('bio = ?');
            values.push(bio);
        }
        if (profilePicUrl) {
            updateFields.push('profile_pic = ?');
            values.push(profilePicUrl);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: "failure", error: "No fields to update" });
        }

        // Add userId for WHERE clause
        values.push(userId);

        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
        await Database.runAnyQuery(query, values);
        
        // Fetch updated user data
        const updatedUser = await Database.getById("users", userId);
        
        if (!updatedUser || updatedUser.length === 0) {
            return res.status(404).json({ message: "failure", error: "User not found" });
        }

        const userData = { ...updatedUser[0] };
        delete userData.password;

        res.json({ message: "success", data: userData });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: "failure", error: "Failed to update profile" });
    }
};

module.exports = { getUsers, getUser, addUser, deleteUser, updateUser };