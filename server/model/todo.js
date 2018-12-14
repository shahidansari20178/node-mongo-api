var mongoose=require('mongoose');

var todo =mongoose.model('todo',{
    
    email:
    {
        type:String,
        //default:null,
        minlength:1,
        required:true,
        trim:1                
    }
});

module.exports={ todo };
