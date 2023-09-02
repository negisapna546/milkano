const dbOperations = require("../../db/dbConfig");

const getRoles = async (req, res) => {
  try {
    // Fetch all roles
    const rolesQuery = "SELECT * FROM role WHERE is_deleted = 0 AND is_active = 1";
    const roles = await dbOperations.executeQuery(rolesQuery);

    // Fetch permissions for each role
    const rolesWithPermissions = await Promise.all(
      roles.map(async (role) => {
        const permissionsQuery = "SELECT * FROM role_permission_mapping WHERE role_id = ?";
        const permissions = await dbOperations.executeQuery(permissionsQuery, [role.id]);
        return { ...role, permissions };
      })
    );

    res.json({ roles: rolesWithPermissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getRoles,
};
