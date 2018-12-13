var {MongoClient,ObjectID}=require('mongodb');

var url="mongodb://localhost:27017/todoApp";
MongoClient.connect(url,function(err,db)
                   {
    if(err)
        {
            console.log('Unable to Connect');
        }
    console.log('Successfully Connected');
    db.collection("Users").findOneAndUpdate({name:"yash"},{$set:{
        name:"yash jariwala",location:"bardoli"
    }},{$inc:{age:50}}).then((result)=>
             {
        console.log(result);
    })
    
    db.collection("Users").find().toArray().then((result)=>
    {
        console.log(JSON.stringify(result,undefined,2));
    });
    db.close();
});