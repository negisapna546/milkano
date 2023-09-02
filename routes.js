var express = require("express");
var router = express.Router();
require("dotenv").config();
const validateToken = require("./middleware/tokenHandler");

const  {addUser} = require("./controllers/user/addUserController");
const  {updateUserData }= require("./controllers/user/updateUserController");
const  {createRole} = require("./controllers/role/addRoleController");
const  {getRoles} = require("./controllers/role/getRolesController");
const  {updateRolePermission} = require("./controllers/role/addPermission");
const  {updateRole} = require("./controllers/role/updateRoleController");
const  {addModule} = require("./controllers/module/addModuleController");
const  {getModule} = require("./controllers/module/getModuleController");

router.post("/user/create",addUser);
router.post("/user/update/:id", updateUserData);
router.post("/addrole", createRole);
router.get("/rolelist", getRoles);
router.post("/addrolepermission", updateRolePermission);
router.post("/role/update/:id", updateRole);

// module
router.post("/module/add", addModule);
router.get("/moduleLIst", getModule);

module.exports = router;
