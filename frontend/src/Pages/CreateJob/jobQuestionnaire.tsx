
import { Button, TextField } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const JobQuestionnaire = () => {
  const [questions, setQuestions] = useState<string[]>([""]);
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      state: {
        details: state,
        questions: questions,
      },
    };
    navigate("/job_preview", body);
  };

  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-3/12  pt-10 border-r"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl  translate-x-10">Create New Job Listing</div>
          <div className="flex flex-col items-start  ml-10  mt-10 ">
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div
          className="w-9/12 pt-10 pl-10"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl translate-x-10">Add Questions</div>
          <div className="flex flex-col">
            <form onSubmit={onSubmit} noValidate className="m-4 mx-10">
              {questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <TextField
                    label={`Question ${index + 1}`}
                    value={question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                    required
                    fullWidth
                    sx={{
                      "& label": { paddingLeft: (theme) => theme.spacing(1) },
                      "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                      "& fieldset": {
                        paddingLeft: (theme) => theme.spacing(1.5),
                        borderRadius: "10px",
                      },
                    }}
                  />
                  <Button
                    onClick={() => handleRemoveQuestion(index)}
                    variant="text"
                    color="secondary"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={handleAddQuestion}
                variant="contained"
                color="primary"
                style={{
                  background: "#FF5353",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                Add Question
              </Button>
              <div>
                <Button
                  type="submit"
                  variant="outlined"
                  style={{
                    color: "#FF5353",
                    borderColor: "#FF5353",
                    textTransform: "none",
                    fontSize: "16px",
                    minWidth: "200px",
                  }}
                >
                  Proceed
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobQuestionnaire;

