const express = require('express');

const router = express.Router();

const servicesBL = require('../models/servicesBL')

router.route('/update')
    .put(async function (req, res) {
        let updateStatus = await servicesBL.updateMovie(req.body);
        return res.json({updateStatus});
    })  

    router.route('/add')
    .post(async function (req, res) {
        let postStatus = await servicesBL.addMovie(req.body);
        return res.json({postStatus});
    })  
    
    router.route('/delete/:id')
    .delete(async function(req, res)
    {
        let movie = await servicesBL.deleteMovie(req.params.id)
        return res.json(movie);
    })
    

module.exports = router