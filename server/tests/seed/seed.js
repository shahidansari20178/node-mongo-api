const {ObjectID}=require('mongodb');
const {user}=require('./../../model/user.js');


const user2 = [
    {
        _id:new ObjectID(),
        name: "shahid"
    }, {
        _id:new ObjectID(),
        name: "aman"
    }];
const poptodo=(done)=>
{
  user.remove({}).then(()=>
  {
      return user.insertMany(user1);
  }).then(()=>done());
};
module.exports={poptodo,user2};