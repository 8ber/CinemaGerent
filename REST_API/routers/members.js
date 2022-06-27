const express = require('express');

const router = express.Router();

const servicesBL = require('../models/servicesBL')

router.route('/update')
    .put(async function (req, res) {
        let updateStatus = await servicesBL.updateMember(req.body);
        return res.json({updateStatus});
    })  

    router.route('/add')
    .post(async function (req, res) {
        let postStatus = await servicesBL.addMember(req.body);
        return res.json({postStatus});
    })  
    
    router.route('/delete/:id')
    .delete(async function(req, res)
    {
        let movie = await servicesBL.deleteMember(req.params.id)
        return res.json(movie);
    })

module.exports = router