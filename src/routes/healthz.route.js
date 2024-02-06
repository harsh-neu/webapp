const express = require("express");
const {gethealthCheck,healthCheck} =  require('../controller/healthzController');
const router = express.Router();

router.get('/',gethealthCheck);
router.use('/',healthCheck);

module.exports = router;