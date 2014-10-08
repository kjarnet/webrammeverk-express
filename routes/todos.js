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

router.post('/', function(req, res, next) {
    'use strict';
    var newTodo = new Todo({
        title: req.body.title,
        completed: req.body.completed
    });
    newTodo.save(function (err, data) {
        if (err) {
            next(err);
        } else {
            debug(data);
            res.send(data); // TODO: Is _id contained in data?
        }
    });
});

router.put('/:id', function(req, res, next) {
    'use strict';
    var todoId = req.params.id;
    var newData = {
        title: req.body.title,
        completed: req.body.completed
    };
    Todo.update({_id: todoId}, newData, function (err, data) {
        if (err) {
            next(err);
        } else {
            res.send(data);
        }
    });
});


router.delete('/:id', function(req, res, next) {
    'use strict';
    var todoId = req.params.id;
    Todo.remove({_id: todoId}, function (err) {
        if (err) {
            next(err);
        } else {
            res.status(200).send();
        }
    });
});


module.exports = router;
