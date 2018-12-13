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

//count
    /*
    db.collection('Users').find().count().then((count)=>{
        console.log(`Total Count ${count}`);
    },(err)=>{
            console.log('unable to fetch docs',err);
    })});
*/

    db.collection('Users').find().toArray().limit(2).then((docs)=>
                                       {
        console.log(JSON.stringify(docs,undefined,2)),(err)=>
        {
            console.log('unable to fetch docs',err);
        }
    })
     });

    /*db.collection('Users').find().toArray().then((docs)=>
    {
        console.log('todos');
        console.log(JSON.stringify(docs,undefined,2));
    }),
        (err)=>
    {
        console.log('unable to fetch docs',err);
    }
    } );
    
    db.collection('Users').insertOne({name:'tushar',age:23,location:"surat"},(err,result)=>{
        if(err)
            {
              return  console.log('uanble to insert',err);
            }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    } );*/
 

 // db.close();
//});
    