var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');
var globals = require('../globals');
var debug = require('debug')(globals.appName);

/* GET all todos. */
router.get('/', function(req, res, next) {
    'use strict';
    Todo.find({}, function (err, docs) {
        if (err) {
            next(err);
        } else {
            debug(docs);
            res.send(docs);
        }
    });
});

module.exports = router;
