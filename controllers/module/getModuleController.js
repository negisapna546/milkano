const dbOperations = require("../../db/dbConfig");

const getModule = async (req, res) => {
  try {
    const query = "SELECT * FROM modules where is_deleted = 0 AND is_active = 1";
    const ModulesList = await dbOperations.executeQuery(query);

    res.json({ ModulesList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
    getModule,
};
