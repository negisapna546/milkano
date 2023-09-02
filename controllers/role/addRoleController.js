const dbOperations = require("../../db/dbConfig");

const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({ error: "Missing role_name field" });
    }

    const insertQuery = "INSERT INTO role (role_name) VALUES (?)";
    await dbOperations.executeQuery(insertQuery, [role_name]);

    res.json({ message: "Role added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createRole,
};
