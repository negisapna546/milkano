const dbOperations = require("../../db/dbConfig");

const addModule = async (req, res) => {
  try {
    const { module_name } = req.body;

    if (!module_name) {
      return res.status(400).json({ error: "Missing  field" });
    }

    const insertQuery = "INSERT INTO modules (module_name) VALUES (?)";
    await dbOperations.executeQuery(insertQuery, [module_name]);

    res.json({ message: "Module added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
    addModule,
};
