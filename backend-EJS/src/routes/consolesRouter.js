const express = require("express");
const router = express.Router();
const consoleController = require('../controllers/consoleController');

router.get('/consoles', consoleController.list );

module.exports = router;
