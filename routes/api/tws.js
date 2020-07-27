const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();

const Tw = require('../../models/Tw');
const testMiddleware = require('../../middlewares/test');

var tws = [];

Router.get('/', testMiddleware, (req, res) => {
    //res.status(200).send('GET Tws');
    res.status(200).json(tws);
})

Router.get('/:twId', (req, res) => {
    twId = req.params.twId;

    tw = tws.filter((tw) => {
        return tw.id == twId;
    });

    //res.status(200).send('GET Tw Id: ' + twId);
    res.status(200).json(tw);
})

Router.post('/', (req, res) => {
    console.log("Save method");

    if (req.body.message && req.body.message != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.body.message
        })
        tw.save()
            .then(tw => {
                res.status(200).send(tw);
            })
            .catch(err => {
                res.status(500).json({error: err});
            })
    } else {
        res.status(500).json({error: "Please put some values"});    
    }
    // tws.push({
    //     id: 7,
    //     message: req.body.message
    // })

    // //res.status(200).send('POST Tw: ' + req.body.message);
    // res.status(200).json(tws);
})

Router.delete('/:twId', (req, res) => {
    console.log("Delete method");

    const twId = req.params.twId;

    if (twId && twId != "") {
        const tw = new Tw({
            _id: twId,
            message: req.body.message
            //message: 'test'
        })
        tw.remove()
            .then(tw => {
                res.status(200).send("Delete succeed !");
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        res.status(500).json({error: "Please put the Id"});    
    }
    // twId = req.params.twId;

    // tws = tws.filter((tw) => {
    //     return tw.id != twId;
    // })

    // res.status(200).json(tws);
})

Router.patch('/:twId', (req, res) => {
    console.log("Patch method");

    const twId = req.params.twId;

    if (twId && twId != "") {
        Tw.update({_id: twId},{message: req.body.message})
            .then(tw => {
                res.status(200).send("Patch succeed !");
            })
            .catch(err => {
                res.status(500).json({error: err});    
            })
    } else {
        res.status(500).json({error: "Please put the Id"}); 
    }
    // message = req.body.message;

    // tws.filter((tw) => {
    //     if (tw.id == twId) {
    //         //console.log(twId);
    //         tw.message = message;
    //     }
    // });
    
    // res.status(200).json(tws);
})

module.exports = Router;