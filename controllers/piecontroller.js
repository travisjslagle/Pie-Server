// const express = require('express');
// const router = express.Router();

const pie = require('../models/pie');

    // ---this is the same as above---
const router = require('express').Router();

const Pie = require('../db').import('../models/pie');
// const validateSession = require('../middleware/validate-session');

    //---this was our test---
// router.get('/', (req, res) => res.send('I love pies!'));

//! GET ALL
router.get('/', (req, res) => {
    Pie.findAll()
        .then(pie => res.status(200).json(pie))
        .catch(err => res.status(500).json({ error: err }))
})

//! POST
router.post('/', (req, res) => {
    const pieFromRequest = {
        nameOfPie: req.body.nameOfPie,
        baseOfPie: req.body.baseOfPie,
        crust: req.body.crust,
        timeToBake: req.body.timeToBake,
        servings: req.body.servings,
        rating: req.body.rating
    }

    Pie.create(pieFromRequest)
        .then(pie => res.status(200).json(pie))
        .catch(err => res.status(500).json({ error: err }));
})

// CHALLENGE fix the typos (there were 3 in each, some of them were things we couldn't know about -- which is fucking dumb):
//! GET by Name:
router.get('/:name', (req, res) => {     // change path to '/:name' to create an endpoint to search at
    Pie.findOne({ where: { nameOfPie: req.params.name }})  // findOne not findone , req.params.name
      .then(pie => res.status(200).json(pie))
      .catch(err => res.status(500).json({ error: err}))
})

//! UPDATE by ID
router.put('/:id', (req, res) => {
    Pie.update(req.body, { where: { id: req.params.id }})  // capitalize Pie, params instead of body
        .then(pie => res.status(200).json(pie))
        .catch(err => res.status(500).json({ error: err })) // add .status(500), json the error
})

//! DELETE
router.delete('/:id', (req, res) => {
    Pie.destroy({
        where: { id: req.params.id }
    })
    .then(pie => res.status(200).json(pie))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;