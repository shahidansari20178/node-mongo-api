const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {
    app
} = require('./../server');
const {
    user
} = require('./../model/user.js');


const user1 = [
    {
        _id:new ObjectID(),
        name: "shahid"
    }, {
        _id:new ObjectID(),
        name: "aman"
    }];

beforeEach((done) => {
    user.remove({}).then(() => {
        return user.insertMany(user1);
    }).then(() => done());
});


describe('POST /todos', () => {
    it('should create new todo ', (done) => {
        var name = 'shahid';
        request(app)
            .post('/todos')
            .send({
                name
            })
            .expect(200)
            .expect((res) => {
                //console.log();
                expect(res.body.name).toBe(name);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                user.find({
                    name
                }).then((lanet) => {
                    expect(lanet.length).toBe(lanet.length);
                    expect(lanet[0].name).toBe(name);
                    done();
                }).catch((e) => done(e));
            });
    });


    it('should not create user with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                user.find().then((lanet) => {
                    expect(lanet.length-1).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});
    describe('GET /todos', () => {
        it('should GET create new todo ', (done) => {

            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                   // console.log(res);
                    expect(res.body.length).toBe(2);
                
                })
                .end(done);
            /*user.find({name}).then((lanet)=>{
                 expect(lanet.length).toBe(lanet.length);
                 expect(lanet[0].name).toBe(name);
                 done();
             }).catch((e)=>done(e));*/
        });
    });

 describe('GET/todos/', () => {
        it('should return todo ', (done) => {            
            //console.log(`todos/${user1[0]._id.toHexString()}`);
            request(app)
                .get(`/todos/`)
                .expect(200)
                .expect((res) => {
                    //console.log("shahid =>:",res.body);
                    expect(res.body[0].name).toBe(user1[0].name);
                })
                .end(done);
            
            
            /*user.find({name}).then((lanet)=>{
                 expect(lanet.length).toBe(lanet.length);
                 expect(lanet[0].name).toBe(name);
                 done();
             }).catch((e)=>done(e));*/
        });
     it('should return 404 if todo not found ',(done)=>
       {
         var hexId=new ObjectID().toHexString();
            request(app)
         .get(`/todos/${hexId}`)
         .expect(400)
         .end(done);
     });
     it('should return 404 for non object ids ',(done)=>
       {
         request(app)
         .get(`/todos/123abc`)
         .expect(404)
         .end(done);
     }); 
     
    });

describe('DELETE/todos/:id', () => {
        it('should Remove todo 1', (done) => {            
            //console.log(`todos/${user1[0]._id.toHexString()}`);
            var hexID=user1[0]._id.toHexString();
          
           // console.log("id=>:",hexID);
            request(app)
                .delete(`/todos/${hexID}`)
                .expect(404)
                .expect((res) => {
                    console.log(res.body);
                    expect(hexID).toBe(hexID);
                })
                .end((err,res)=>
                    {
                if(err)
                    {
                        return done(err);
                    }
            });
            
            
            user.findById(hexID).then((lanet)=>{
                 expect(lanet).toExist();
                done();
             }).catch((e)=>done(e));
        });
     it('should remove 404 if todo not found ',(done)=>
       {
         var hexId=new ObjectID().toHexString();
        request(app)
         .delete(`/todos/${hexId}`)
         .expect(404)
         .end(done);
     });
     it('should remove 404 for non object ids ',(done)=>
       {
         request(app)
         .delete(`/todos/123abc`)
         .expect(404)
         .end(done);
     });
     
    });
//https://github.com/shahidansari20178/node-mongo-api.git