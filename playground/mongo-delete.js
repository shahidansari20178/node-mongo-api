//var MongoClient = require('mongodb').MongoClient;
var {MongoClient,ObjectID} = require('mongodb');
var obj=new ObjectID();
///console.log(obj);
// Connection URL
var url = 'mongodb://localhost:27017/todoApp';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if(err)
     {
        return console.log("Unable to Connect");        
    }
     console.log("Connected correctly to server");

    /*db.collection('Users').deleteMany({name:"yash jariwala"}).then((result)=>
    {
      console.log(result);  
        
    });*/
    /*db.collection('Users').deleteOne({name:"tushar"}).then((result)=>
                                                 {
        console.log('delete Succuessfully');
    });*/
    /*db.collection('Users').findOneAndDelete({name:"tushar"}).then((result)=>
                                                 {
        console.log('delete Succuessfully',result);
    });*/
    db.collection("Users").findOneAndDelete({_id:new ObjectID("5c122b1fc176cc099c947dd5")}).then((result)=>
    {
        console.log(JSON.stringify(result,undefined,2));
    });
    db.close();
});