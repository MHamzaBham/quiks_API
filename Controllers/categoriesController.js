const Database = require("../Database/Database");

const { getFromTable } = Database;

// get all the categories from the database
const getAllCategories = async (req, res) => {
  const data = await getFromTable("*", "category");
  res.json({ categories: data });
};

// get single category ( by id )
const getCategoryById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "Category ID is required" });
  }
  const data = await getFromTable("*", "category", `WHERE id=${id}`);
  if (data || data.length === 0) {
    res.status(404).json({ message: "No books found for this category" });
  }
  res.json({ categories: data });
};

// get books under specfic category
const getBooksByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }
    const data = await getFromTable(
      "*",
      "bookcategorymapping",
      `WHERE category_id=${id}`
    );

    if (!data || data.length === 0) {
      res.status(404).json({ message: "No books found for this category" });
    }

    res.status(200).json({ books: data });
  } catch (error) {
    // console.error("Error fetching books by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// finding all the categories of user searched word/topic
const filterCategories = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      res.status(400).json({ message: "No search query provided" });
    }
    const data = await getFromTable(
      "*",
      "category",
      `WHERE name LIKE="%${query}" or description LIKE="%${query}%" `
    );
    if (!data || data.length === 0) {
      res.status(404).json({ message: "No Categories of this topic" });
    }
    res.json({ categories: data });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  const query = `INSERT INTO category (name, description) VALUES (?, ?)`;
  const values = [name, description];
  try {
    results = await Database.insertData(query, values);
    res.json({ message: "success!", results: results });
  } catch (error) {
    console.log(error);
    res.json({ message: "failure!", results: error });
  }
};

const updateCategory = async (req, res) => {
  const { id, name, description } = req.body;
  const query = `UPDATE category SET name = ?, description = ? WHERE id = ?`;
  if (!id || !name || !description) {
    return res
      .status(400)
      .json({ message: "All fields (id, name, description) are required." });
  }

  const values = [name, description, id];
  try {
    const results = await Database.insertData(query, values);
    return res.status(200).json({
      message: "Category updated successfully!",
      results: results,
    });
  } catch (error) {
    console.error("Database update failed:", error);
    return res.status(500).json({
      message: "An error occurred while updating the category.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getBooksByCategory,
  filterCategories,
  getCategoryById,
  addCategory,
  updateCategory,
};
