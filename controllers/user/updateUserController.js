const dbOperations = require("../../db/dbConfig");
const crypto = require("crypto");

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const getUserById = async (userId) => {
  const query = `SELECT * FROM user WHERE id = ?`;
  const result = await dbOperations.executeQuery(query, [userId]);
  return result[0];
};
const updateUser = async (userId, newData) => {
  const updateQuery = `UPDATE user SET name = ?, email = ?, mobile_number = ?,password = ?,type = ?,role_id = ?,address = ? WHERE id = ?`;
  await dbOperations.executeQuery(updateQuery, [...Object.values(newData), userId]);
};

const updateUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, mobile_number ,password,type,role_id,address } = req.body;

    if (!name || !email || !mobile_number || !password || !type || !role_id || !address ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's data
    const updatedData = {  name, email, mobile_number ,password,type,role_id,address };
    await updateUser(userId, updatedData);

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  updateUserData,
};
