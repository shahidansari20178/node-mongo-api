var mongoose = require('mongoose');

var user = mongoose.model('user4', {
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