const request = require('supertest')
const app = require('../app')
var chai = require('chai')
var expect = chai.expect;

describe('/login tests', function () {
    it('Success 200 login', function (done) {
        request(app).post('/login')
            .send({ email: 'optimus.prime@autobots.com', password: 'validPassword1234!' })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.token).to.equal("xyz0987654321")
                done();
            });
    });
    it('Unauthorized 401 login', function (done) {
        request(app).post('/login')
            .send({ email: 'optimus.prime@autobots.com', password: 'invalidPassword1234!' })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });
});

describe('/encode tests', function () {
    it('Success 200 encode with input A, return A1', function (done) {
        request(app).post('/encode')
            .set('authorization', 'xyz0987654321')
            .send({ input:"A" })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.encode).to.equal("A1")
                done();
            });
    });
    it('Success 200 encode with input AAAAAAAAAAAAAAAAAAAAA, return A9A9A3', function (done) {
        request(app).post('/encode')
            .set('authorization', 'xyz0987654321')
            .send({ input:"AAAAAAAAAAAAAAAAAAAAA" })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.encode).to.equal("A9A9A3")
                done();
            });
    });
    it('Wrong token, 401 unauthorized', function (done) {
        request(app).post('/encode')
            .set('authorization', 'wrongToken')
            .send({ input:"AAAAAAAAAAAAAAAAAAAAA" })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                expect(res.body).to.be.empty;
                done();
            });

    });
    it('Success 200 encode with input XXXYYYYZZQXX, return X3Y4Z2Q1X2', function (done) {
        request(app).post('/encode')
            .set('authorization', 'xyz0987654321')
            .send({ input:"XXXYYYYZZQXX" })
            .end(function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.encode).to.equal("X3Y4Z2Q1X2");
                done();
            });
            
    });
    
});

