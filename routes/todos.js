var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');
var globals = require('../globals');
var debug = require('debug')(globals.appName);

/* GET all todos. */
router.get('/', function(req, res) {
    Todo.find({}, function (err, docs) {
        debug(docs);
        res.send(docs);
    });
});

router.post('/', function(req, res) {
    var newTodo = new Todo({
        title: req.body.title,
        completed: req.body.completed,
        order: req.body.order
    });
    newTodo.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            debug(data);
            res.send(data); // TODO: Is _id contained in data?
        }
    });
});

router.put('/:id', function(req, res) {
    var todoId = req.params.id;
    var newData = {
        title: req.body.title,
        completed: req.body.completed,
        order: req.body.order
    };
    Todo.update({_id: todoId}, newData, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});


router.delete('/:id', function(req, res) {
    var todoId = req.params.id;
    Todo.remove({_id: todoId}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).send();
        }
    });
});


module.exports = router;
