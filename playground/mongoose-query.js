const {mongoose}=require('./../server/db/mongoose.js');
const {user}=require('./../server/model/user.js');
var id='5c148d5b08917d1c8c16789f';

user.find({name:"aman"}).then((done)=>
                         {
 console.log('todos',done);
});

//mongoose.connection.close();