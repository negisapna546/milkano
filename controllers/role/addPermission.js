const dbOperations = require("../../db/dbConfig");

const updateRolePermission = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.permissionJson) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const { role_id, module_id, permissionJson } = data;

    const insertQuery =
      "INSERT INTO role_permission_mapping (role_id, module_id, permission) VALUES (?, ?, ?)";

    const parameters = [role_id, module_id, JSON.stringify(permissionJson)];

    await dbOperations.executeQuery(insertQuery, parameters);

    res.json({ message: "Permission added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  updateRolePermission,
};
