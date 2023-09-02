const dbOperations = require("../../db/dbConfig");

const updateRole = async (req, res) => {
  try {
    const role_id = req.params.id;
    const { role_name } = req.body; 

    if (!role_name) {
      return res.status(400).json({ error: "Missing role_name field" });
    }

    const updateQuery = "UPDATE role SET role_name = ? WHERE id = ?";
    await dbOperations.executeQuery(updateQuery, [role_name, role_id]); 

    res.json({ message: "Role updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
    updateRole,
};
