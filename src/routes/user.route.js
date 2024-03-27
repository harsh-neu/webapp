const express = require("express");
const user = require("../controller/userController");

const router = express.Router();

router.get('/self',user.getUser);
router.post('/',user.createUser);
router.put('/self',user.updateUser);
router.get('/verify',user.verify);

module.exports = router;
