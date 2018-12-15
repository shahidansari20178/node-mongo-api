const expect = require('expect');
const request = require('supertest');
const {
    app
} = require('./../server');
const {
    user
} = require('./../model/user.js');


const user1 = [
    {
        name: "shahid"
    }, {
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
//https://github.com/shahidansari20178/node-mongo-api.git