const dbOperations = require("../../db/dbConfig");

const getUser = async (req, res) => {
  try {
    const query = "SELECT * FROM user where is_deleted = 0 AND is_active = 1 ";
    const roles = await dbOperations.executeQuery(query);

    res.json({ roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getUser,
};
