const Database = require('../Database/Database')

const getBooks = async (req, res) => {
    console.log("hehe");
    let data = Database.getFromTable('*', 'Books')
    res.json({books: data})
}

module.exports = {getBooks}