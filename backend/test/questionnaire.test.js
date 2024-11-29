let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const app = require("../index"); // Ensure the correct path to your `index.js` file
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('Dynamic Questionnaires', () => {
//   after(() => {
//     // Close the server after tests are done
//     server.close();
//   });

  it('Should allow creation of a dynamic number of questions', (done) => {
    const questionnaire = {
      jobId: 1001,
      questions: [
        'What are your strengths?',
        'What is your expected salary?',
        'Describe a challenging project.',
        'Where do you see yourself in 5 years?',
        'What is your preferred working style?'
      ],
    };

    chai.request(app)
      .post('/api/v1/questionnaire')
      .send(questionnaire)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('Questionnaire created successfully');
        done();
      });
  });

  it('Should not allow empty questions in the questionnaire', (done) => {
    const questionnaire = {
      jobId: 1001,
      questions: [''],
    };

    chai.request(app)
      .post('/api/questionnaire')
      .send(questionnaire)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
