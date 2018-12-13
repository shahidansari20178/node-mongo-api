var  mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/todoApp");
 var todo=mongoose.model('todo',{
    name:{
      type:String  
    },
     age:{
         type:Number
     },
     location:{
         type:String
     }     
 });

var newtodo=new todo({
   name:"shahid",
   age:22,
    location:"surat"    
});
newtodo.save().then((doc)=>
                   {
    console.log(JSON.stringify(doc,undefined,2));
},(e)=>{
    console.log('Unable to save');
});
//mongoose.close();