var mongoose=require('mongoose');

var user=mongoose.model('user4',{
    name:{
      type:String  ,
       // ,require:true,
        minlength:1
    },
     salary:{
         type:Number
     },
     company:{
         type:String
     }     
 });

module.exports={ user };