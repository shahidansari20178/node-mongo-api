const {mongoose}=require('./../server/db/mongoose.js');
const {user}=require('./../server/model/user.js');
var id='5c148d5b08917d1c8c16789f';

/*user.find({name:"aman"}).then((done)=>
                         {
 console.log('todos',done);
});


user.findById(id).then((done)=>
{
    console.log('todos',done);
});*/

/*
user.remove({name:"aman"}).then((done)=>
{
    console.log('todos',done);
});
*/

/*
user.findOneAndUpdate({name:"shahid"},{$set:{name:"shahid Ansari"}}).then((done)=>
{
    console.log('Update Document',done);
});
*/
user.find({}).then((done)=>{
 console.log('all Collection',JSON.stringify(done,undefined,2));
});
user.find().then((done)=>
                         {
 console.log('todos',done);
});

/*
user.find().then((done)=>{
 console.log('all Collection',JSON.stringify(done,undefined,2));
});
*/
//mongoose.connection.close();