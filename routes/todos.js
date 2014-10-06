var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

/* GET all todos. */
router.get('/', function(req, res) {
    Todo.find({}, function (err, docs) {
        debug(docs);
        res.send(docs);
    });
});

router.post('/', function(req, res) {
    var newTodo = new Todo({
        desc: req.body.desc,
        done: req.body.done
    });
    newTodo.save(function (err, data) {
        if (err) {
            res.send(err);
        } else {
            debug(data);
            res.send(data); // TODO: Is _id contained in data?
        }
    });
    res.send('respond with new resource');
});

router.put('/:id', function(req, res) {
    var todoId = req.params.id;
    var newData = {
        desc: req.body.desc,
        done: req.body.done
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
    Todo.remove({_id: id}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send(''); // TODO: How to send empty respons?
        }
    });
});


module.exports = router;
