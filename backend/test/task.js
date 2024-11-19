let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
const { default: mongoose } = require("mongoose");
const User = require("../models/user");

chai.should();
chai.use(chaiHttp);

describe("Tasks API", function () {
  this.timeout(10000);

  before(function (done) {
    if (mongoose.connection.readyState === 1) {
      done();
    } else {
      mongoose.connection.once("open", done);
      mongoose.connection.on("error", done);
    }
  });

  // Test for fetching all applications
  describe("GET /api/v1/users/fetchapplications", () => {
    it("IT SHOULD RETURN ALL THE APPLICATIONS", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/fetchapplications")
        .end((err, response) => {
          response.body.should.be.a("object");
          console.log("*", response.body);
          done();
        });
    });
  });

  // Test for fetching all jobs
  describe("GET /api/v1/users/", () => {
    it("IT SHOULD RETURN ALL THE JOBS", (done) => {
      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/")
        .end((err, response) => {
          response.body.should.be.a("object");
          console.log("*", response.body);
          done();
        });
    });
  });

  // Empty test case (left as is)
  describe("GET /api/v1/users/", () => {
    it("IT SHOULD RETURN ALL THE JOBS", (done) => {
      done();
    });
  });

  // Test for creating a job (first occurrence)
  describe("POST /api/v1/users/createjob", () => {
    it("IT SHOULD RETURN THE JOB", (done) => {
      const body = {
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };
      done();
    });
  });

  // Test for creating a job (second occurrence)
  describe("POST /api/v1/users/createjob", () => {
    it("IT SHOULD RETURN THE JOB", (done) => {
      const body = {
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };

      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/createjob")
        .send(body)
        .end((err, response) => {
          response.body.should.be.a("object");
          console.log("*", response.body);
          done();
        });
    });
  });

  // Test for searching jobs
  describe("GET /api/v1/users/search", () => {
    it("IT SHOULD RETURN THE SEARCHED JOB", (done) => {
      const body = {
        name: "Shaan",
        managerid: "1234556",
        skills: "C,java",
        location: "Noida",
        description: "xyz",
        pay: "10",
        schedule: "10/10/10",
      };

      chai
        .request("http://localhost:8000")
        .get("/api/v1/users/search/TA")
        // .send(body) // Not needed for GET request
        .end((err, response) => {
          response.body.should.be.a("object");
          console.log("*", response.body.users);
          done();
        });
    });
  });

  // Test for user login session creation
  describe("POST /api/v1/users/create-session", () => {
    it("IT SHOULD RETURN THE USER", (done) => {
      const body = { email: "boss@gmail.com", password: "123" };
      chai
        .request("http://localhost:8000")
        .post("/api/v1/users/create-session")
        .send(body)
        .end((err, response) => {
          response.body.should.be.a("object");
          console.log("*", response.body);
          done();
        });
    });
  });

  // Test for sending job acceptance email
  describe("POST /send/send-job-acceptance-email", () => {
    it("It should send a job acceptance email", (done) => {
      const emailBody = {
        applicationId: "application123",
        jobid: "job456",
        emailType: "acceptance",
        applicantEmail: "applicant@example.com",
        applicantName: "John Doe",
        jobTitle: "Software Engineer",
        companyName: "NCSU",
        contactEmail: "contact@ncsu.edu",
      };

      chai
        .request("http://localhost:8000")
        .post("/send/send-job-acceptance-email")
        .send(emailBody)
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eql("Application accepted and email sent.");
          console.log("Response:", response.body);
          done();
        });
    });
  });

  // Test for sending job rejection email
  describe("POST /send/send-job-rejection-email", () => {
    it("It should send a job rejection email", (done) => {
      const emailBody = {
        applicationId: "application123",
        jobid: "job456",
        emailType: "rejection",
        applicantEmail: "applicant@example.com",
        applicantName: "John Doe",
        jobTitle: "Software Engineer",
        companyName: "NCSU",
        contactEmail: "contact@ncsu.edu",
      };

      chai
        .request("http://localhost:8000")
        .post("/send/send-job-rejection-email")
        .send(emailBody)
        .end((err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          response.body.should.be.a("object");
          console.log("Response:", response.body);
          done();
        });
    });
  });

  // Test for initiating forgot password process
  describe("POST /send/forgot-password", () => {
    it("It should initiate the forgot password process", (done) => {
      const body = {
        email: "priyanshumalaviya9@gmail.com",
      };

      chai
        .request("http://localhost:8000")
        .post("/send/forgot-password")
        .send(body)
        .end(async (err, response) => {
          if (err) return done(err);
          response.should.have.status(200);
          console.log("Response:", response.body);
          done();
        });
    });
  });

  describe("POST /send/selection-email", () => {
    it("It should send a job Selection email", (done) => {
      const emailBody = {
        applicationId: "application123",
        jobid: "job456",
        emailType: "acceptance",
        applicantEmail: "applicant@example.com",
        applicantName: "John Doe",
        jobTitle: "Software Engineer",
        companyName: "NCSU",
        contactEmail: "contact@ncsu.edu",
      };

      chai
        .request("http://localhost:8000")
        .post("/send/selection-email")
        .send(emailBody)
        .end((err, response) => {
          if (err) return done(err);
          try {
            response.should.have.status(201);
            console.log("Response:", response.body);
            done();
          } catch (error) {
            done(error);
          }
        });
    });
  });
});