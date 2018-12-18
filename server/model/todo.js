var mongoose = require('mongoose');
var validator = require('validator');
var todo = mongoose.model('useryashes', {

    email: {
        type: String,
        //default:null,
        minlength: 1,
        // required:true,
        unique:true,
        trim: 1,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        },
            ]
});

module.exports = {
    todo
};