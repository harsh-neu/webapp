const express = require("express");
const user = require("../controller/userController");

const router = express.Router();

router.get('/self',user.getUser);
router.post('/',user.createUser);
router.put('/self',user.updateUser);

module.exports = router;
