var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var Todo = new Schema({
    desc : {type: String, required: true, trim: true},
    done : Boolean
});
module.exports = mongoose.model('Todo', Todo);

