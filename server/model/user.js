var mongoose = require('mongoose');


var user = mongoose.model('users', {
    name: {
        type: String,
        require: true,
        minlength: 1
    },
    salary: {
        type: Number,
        require: true
    },
    company: {
        type: String,
        require: true

    }
});

module.exports = {
    user
};