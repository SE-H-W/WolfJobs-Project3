let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const app = require("../index"); // Ensure the correct path to your `index.js` file
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('Missing Keywords in Resume', () => {
    it('Should return a list of missing keywords in the resume', (done) => {
        chai.request(app)
            .post('/api/keywords')
            .send({ resumeText: 'Experienced in Python and machine learning', jobDescription: 'Looking for skills in Python, machine learning, and data visualization' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('missingKeywords').eql(['data visualization']);
                done();
            });
    });

    it('Should return an empty list if all keywords are present', (done) => {
        chai.request(app)
            .post('/api/keywords')
            .send({ resumeText: 'Experienced in Python, machine learning, and data visualization', jobDescription: 'Looking for skills in Python, machine learning, and data visualization' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('missingKeywords').eql([]);
                done();
            });
    });
});
