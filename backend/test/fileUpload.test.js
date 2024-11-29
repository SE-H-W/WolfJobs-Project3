let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const app = require("../index"); // Ensure the correct path to your `index.js` file
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('File Uploads', () => {
    it('Should upload a resume and cover letter', (done) => {
        chai.request(app)
            .post('/api/upload')
            .attach('resume', path.join(__dirname, 'files/sample_resume.pdf'))
            .attach('coverLetter', path.join(__dirname, 'files/sample_cover_letter.pdf'))
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').eql('Files uploaded successfully');
                done();
            });
    });

    it('Should not upload unsupported file types', (done) => {
        chai.request(app)
            .post('/api/upload')
            .attach('resume', path.join(__dirname, 'files/sample_resume.txt'))
            .end((err, res) => {
                expect(res).to.have.status(415); // Assuming 415 Unsupported Media Type
                done();
            });
    });
});
