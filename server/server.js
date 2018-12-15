var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID}=require('mongodb');

var {
    mongoose
} = require('./db/mongoose.js');
var {
    user
} = require('./model/user.js');
var {
    todo
} = require('./model/todo.js');

var app = express();

app.use(bodyParser.json());


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    user.findById(id).then((todos) => {
        if (!todos) {
            return res.status(404).send();
        }
        res.send({
            todos
        });
    }).catch((e) => {
        res.status(400).send();
    });
});


app.get('/todos', (req, res) => {
    user.find().then((todos) => {
        res.send(todos);
    }, (err) => {
        res.status(400).send(err);
    });
});


app.post('/todos', (req, res) => {
    // console.log("Passed data :",req.body);
    /*var td=new todo(
    {
        email:req.body.text
    });
    
    */
    var td = new user({
        name: req.body.name,
        salary: req.body.salary,
        company: req.body.company

    });

    td.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});


app.listen(4000, () => {
    console.log('connected successfully 4000');
});

module.exports = {
    app
};

/*var  mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/todoApp");*/
/*var todo=mongoose.model('todo',{
    name:{
      type:String  
        ,require:[true,'Its required Field'],
        minlength:1
    },
     age:{
         type:Number,
         default:20
     },
     location:{
         type:String
     }     
 });

var newtodo=new todo({
   name:"rushita",
    location:"surat"    
});


/*newtodo.save().then((doc)=>
                   {
    console.log(JSON.stringify(doc,undefined,2));
},(e)=>{
    console.log('Unable to save');
});*/
//mongoose.close();

/*
var Iuser=new user({
  email:""  
});


Iuser.save().then((doc)=>
{
 console.log(JSON.stringify(doc,undefined,2));
},(e)=>
{
 console.log("unable to save");   
});
mongoose.connection.close();
*/