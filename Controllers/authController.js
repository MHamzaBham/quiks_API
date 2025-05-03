const Database = require("../Database/Database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

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

            const token = jwt.sign({ userId: data[0].id, email: data[0].email }, JWT_SECRET, { expiresIn: '15d' });

            const userData = { ...data[0] };
            delete userData.password; 

            return res.json({ message: "success", data: userData, token });
        })
        .catch(() => {
            return res.json({message: "failure", error: "Error signing up"})
        })
    }
    catch (error) {
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
        if(!(data.length > 0)) {
            return res.json({message: "failure", error: "Email does not exist"})
        }

        // Match password
        const isPassMatched = bcrypt.compareSync(password, data[0].password);
        if(!isPassMatched) {
            return res.json({message: "failure", error: "Incorrect Password"})
        }

        const token = jwt.sign({ userId: data[0].id, email: data[0].email }, JWT_SECRET, { expiresIn: '15d' });

        const userData = { ...data[0] };
        delete userData.password; 

        return res.json({message: "success", data: userData, token});
    }
    catch (error) {
        return res.json({ message: "failure", data: "Something Went Wrong" });
    }
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "failure", error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "failure", error: "Invalid token" });
    }
}

module.exports = { signup, login, verifyToken }