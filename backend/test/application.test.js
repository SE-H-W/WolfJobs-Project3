let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const app = require("../index"); // Ensure the correct path to your `index.js` file
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('Multiple Applications for Single Job Posting', () => {
    it('Should allow multiple applications for the same job posting', (done) => {
        chai.request(app)
            .post('/api/apply')
            .send({ userId: 1, jobId: 1001, resume: 'resume1.pdf', coverLetter: 'cover1.pdf' })
            .end((err, res) => {
                expect(res).to.have.status(201);

                chai.request(app)
                    .post('/api/apply')
                    .send({ userId: 1, jobId: 1001, resume: 'resume2.pdf', coverLetter: 'cover2.pdf' })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        done();
                    });
            });
    });

    it('Should prevent duplicate applications with the same resume for the same job', (done) => {
        chai.request(app)
            .post('/api/apply')
            .send({ userId: 1, jobId: 1001, resume: 'resume1.pdf', coverLetter: 'cover1.pdf' })
            .end((err, res) => {
                expect(res).to.have.status(409); // Assuming 409 Conflict for duplicate submissions
                done();
            });
    });
});
