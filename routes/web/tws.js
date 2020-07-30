const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();

const Tw = require('../../models/Tw')

var list = (req, res, msg = '') => {
    var error = false;

    Tw.find()
        .sort({createdAt:-1})
        .lean()
        .exec()
        .then(tws => {
            res.render('tws', {
                tws: tws,
                error: error,
                msg: msg,
            });
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
}

Router.get('/', (req, res) => {
    const error = false;

    Tw.find()
    .lean()
    .exec()
    .then(tws => {
        res.render('tws', {
            tws: tws,
            error: error
        });
    })
    .catch(err => {
        error = err;
        console.error(error);
    });
})

Router.get('/delete/:twId', (req, res) => {
    twId = req.params.twId;

    Tw.remove({
        _id: twId
    })
        .exec()
        .then(result => {
            res.redirect('/tws/success/Tw well deleted !');
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

Router.get('/', (req, res) =>{
    list(req, res)
});

Router.get('/:type/:msg', (req, res) => {
    var msg = {
        type: req.params.type,
        msg: req.params.msg
    }
    list(req, res, msg)
});

Router.get('/edit/:twId/:twMessage', (req, res) =>{

    Tw.update({_id: req.params.twId},{message: req.params.twMessage})
        .then(tw => {
            res.redirect('/tws/success/Tw well updated !');
        })
        .catch(err => {
            error = err;
            console.error(error);
        });
});

Router.post('/add/:twMessage', (req, res) =>{
    if (req.params.twMessage && req.params.twMessage != "") {
        const tw = new Tw({
            _id: new mongoose.Types.ObjectId(),
            message: req.params.twMessage
        })

        console.log(tw._id + tw.message);

        tw.save()
            .then(tw => {
                res.redirect('/tws/success/Tw well added !');
            })
            .catch(err => {
                error = err;
                console.error(error);
                console.log(tw._id + tw.message);
            })
    } else {
        res.status(500).json({error: "Please put some values"});    
    }
});

module.exports = Router;