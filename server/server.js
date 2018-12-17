var env = process.env.NODE_ENV || 'development';
console.log("evn***", env);
if (env === 'development') {
    process.env.PORT = 4000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todoApp';
} else if (env === 'test') {
    process.env.PORT = 4000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todoAppTest';
}
const _ = require('lodash');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');

const port = process.env.PORT;

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
hbs.registerPartials(__dirname+'/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'hbs');
app.use("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    user.find(id).then((todos) => {
        console.log(todos);
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
app.get('/', (req, res) => {
        
        res.redirect('/index');
});

app.get('/edit/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    user.findById(id).then((todos) => {
        //console.log(todos);
        res.render('edit.hbs', {
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    });
});


app.get('/delete/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    user.findByIdAndRemove(id).then((todos) => {
        if (!todos) {
            return res.status(404).send();
        }
        /*res.send({
            todos
        });*/
        res.redirect('/fetch');
    }).catch((e) => {
        res.status(400).send();
    });
});


app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    user.findByIdAndRemove(id).then((todos) => {
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


app.get('/fetch', (req, res) => {


    //res.send('<h1>hello express</h2>');
    /*res.send({
        name:"shahid",
        likes:["gadgets","games"]
    });*/

    user.find().then((todos) => {
        res.render('home.hbs', {
            todos
        });
    }, (err) => {
        res.status(400).send(err);
    });
});


app.post('/todos', (req, res) => {

    /* var myData = new user(req.body);
 myData.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
   */
    // console.log("Passed data :",req.body);
    /*var td=new todo(  
    {
        email:req.body.text
    });
    
    */
    //console.log("shahid:",req.body);
    var td = new user({
        name: req.body.name,
        salary: req.body.salary,
        company: req.body.company

    });

    td.save().then((doc) => {
        // res.send(doc);
        //res.sendFile(__dirname + "/index.html");
        res.redirect('/fetch');
    }, (e) => {
        res.status(400).send(e);
    });

});

app.post('/update', (req, res) => {
    var id = req.body.id;
    //console.log('shaid:',req.body);
    var body = _.pick(req.body, ['name', 'salary', 'company']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (body.name && body.salary && body.company) {

    } else {

        body.name = body.name;
        body.salary = body.salary;
        body.company = body.company;
    }
    user.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((lanet) => {
        if (!user) {
            return res.status(404).send();
        }
        res.redirect('/fetch');
    }).catch((e) => {
        res.status(400).send();
    });
});




app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'salary', 'company']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (body.name && body.salary && body.company) {

    } else {

        body.name = body.name;
        body.salary = body.salary;
        body.company = body.company;
    }
    user.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((lanet) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send({
            lanet
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`connected successfully ${port}`);
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