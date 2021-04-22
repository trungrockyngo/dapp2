'use strict';

var express = require('express');
const router = express.Router();
const connector = require('../endpoint/mapping')

router.get('/all', async function(req, res, next) {
    const result = await connector.getAllTenders()
    res.json(result); 
});

module.exports = router;
