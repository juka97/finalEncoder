const request = require('supertest')
const app = require('../app')
var expect = require('expect');

describe('Login success', () =>{
    it('should return 200 on login', async () => {
        request(app)
        .post('/login')
        .send({email:'optimus.prime@autobots.com', password:'validPassword1234!'})
        .expect(200);
    });
});

describe('Unauthorized login', () =>{
    it('should return 401 on login with invalid password', async () => {
        const res = await request(app)
        .post('/login')
        .send({email:'optimus.prime@autobots.com', password:'invalidPassword1234!'});
    expect(res.statusCode).toEqual(401);

});
});

