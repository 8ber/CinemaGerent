const express = require('express');

const router = express.Router();

const servicesBL = require('../models/servicesBL')
router.route('/')
    .get(async function (req, res) {
let stats = await servicesBL.getStats();
        return res.json(stats);
    })

module.exports = router