var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var Todo = new Schema({
    title : {type: String, required: true, trim: true},
    completed : Boolean,
    order: Number
});
module.exports = mongoose.model('Todo', Todo);

