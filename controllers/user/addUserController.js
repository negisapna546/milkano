const dbOperations = require("../../db/dbConfig");
const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
const emailExists = async (email) => {
  const query = `SELECT COUNT(*) AS count FROM user WHERE email = ?`;
  const result = await dbOperations.executeQuery(query, [email]);
  return result[0].count > 0;
};

const addUser = async (req, res) => {
  try {
    const { name, email, mobile_number ,password,type,role_id,address } = req.body;
    
    if (!name || !email || !mobile_number || !type || !password || !role_id ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }
    const emailAlreadyExists = await emailExists(email);

    if (emailAlreadyExists) {
      return res.status(400).json({ error: "Email already exists" });
    }
    // Convert the password to base64
    const base64Password = Buffer.from(password).toString("base64");

    const insertQuery = `INSERT INTO user (name, email, mobile_number, type, password,address, role_id) VALUES (?, ?, ?,?,?,?,?)`;
    await dbOperations.executeQuery(insertQuery, [name, email, mobile_number,type,base64Password,address,role_id]);

    res.json({ message: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  addUser,
};
