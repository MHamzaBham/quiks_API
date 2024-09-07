const Database = require("../Database/Database");
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ message: "failure", error: "All field are required" })
    }

    const hash = bcrypt.hashSync(password, 10);
    const user = {
        name: name,
        email: email,
        password: hash
    }

    try {
        // Check if already exists
        data = await Database.findByEmail(email);
        if(data.length > 0) {
            return res.json({message: "failure", error: "Email already exists"})
        }

        // Store new user
        await Database.storeUser(user)
        .then(async () => {
            // Get data of stored user
            data = await Database.findByEmail(email);
            return res.json({ message: "success", data: data });
        })
        .catch(() => {
            // Unable to store user
            return res.json({message: "success", error: "Error signing up"})
        })
    } catch (error) {
        // Unexpected Error
        return res.json({ message: "failure", data: "Something Went Wrong" });
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.json({message: "failure", error: "All field are required"})
    }

    try {
        // find the user by email
        const data = await Database.findByEmail(email);
        if(!(data.length > 0)) { // if no user already
            return res.json({message: "failure", error: "Email does not exist"})
        }

        // Match password
        const isPassMatched = bcrypt.compareSync(password, data[0].password);
        if(!isPassMatched) {
            return res.json({message: "failure", error: "Incorrect Password"})
        }

        return res.json({message: "success", data: data});
    }
    catch (error) {
        // Unexpected Error
        return res.json({ message: "failure", data: "Something Went Wrong" });
    }
}

module.exports = { signup, login }