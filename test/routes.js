const SuperTest = require('supertest');
const Should = require('should');
const {
    Application,
    Database
} = require('./../lib/index.js');
const Request = SuperTest(Application);

// testing all the routes
describe('Router testing', () => {
    before(done => {
        Database.connect()
            .then(() => {
                done();
            });
    });

    after((done) => {
        process.exit(0);
        done();
    });

    it('"/list" should only return names of battles', (done) => {
        Request
            .get('/list')
            .expect(200)
            .then((res) => {
                res.body.should.have.property('battles');
                done();
            });
    });

    it('"/count" should only return count of battles', (done) => {
        Request
            .get('/list')
            .expect(200)
            .then((res) => {
                res.body.should.have.property('battles');
                done();
            });
    });

    it('"/search" should provide search results', (done) => {
        Request
            .get('/search?king=Robb Stark')
            .expect(200)
            .then((res) => {
                res.body.should.have.property('battles');
                done();
            });
    });

    it.only('"/search" should provide search results', (done) => {
        Request
            .get('/search?location=vasai')
            .expect(200)
            .then((res) => {
                res.body.should.have.property('battles');
                res.body.battles.should.be.of.length(1);
                done();
            });
    });

    it('"/stats" should aggregate results', (done) => {
        Request
            .get('/stats')
            .expect(200)
            .then((res) => {
                res.body.should.have.property('battles');
                done();
            });
    });
});