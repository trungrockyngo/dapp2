'use strict';

var express = require('express');
const router = express.Router();
const mapper = require('../endpoint/mapping')

router.get('/tender/all', async function(req, res, next) {
    const result = await mapper.getAllTenders()
    res.json(result); 
});

router.get('/tender/bidder', async function(req, res, next) {
    const result = await mapper.getBidder(req.query.id);
    res.json(result); 
});

router.get('/tender/amount', async function(req, res, next) {
    const result = await mapper.getAmount(req.query.id);
    res.json(result); 
});

router.get('/tender/creator', async function(req, res, next) {
    const result = await mapper.getCreator(req.query.id);
    res.json(result); 
});

router.get('/tender/manager', async function(req, res, next) {
    const result = await mapper.getManager(req.query.id);
    res.json(result); 
});

router.get('/tender/beneficiary', async function(req, res, next) {
    const result = await mapper.getBeneficiary(req.query.id);
    res.json(result); 
});

router.post('tender/approve', async function(req, res, next) {
    const result = await mapper.approveTender(req.body.id, req.body.manager);
    res.json(result); 
});

router.post('tender/openDate', async function(req, res, next) {
    const result = await mapper.setOpeningDate(req.body.id, req.body.day, req.body.month, req.body.year);
    res.json(result); 
});

router.post('tender/closeDate', async function(req, res, next) {
    const result = await mapper.setClosingDate(req.body.id, req.body.day, req.body.month, req.body.year);
    res.json(result); 
});

router.post('/submitTpl', async function(req, res, next) {
    const result = await mapper.submitTenderTemplate(req.body.template);
    res.json(result); 
});

module.exports = router;
