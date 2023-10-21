import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { getexamQuestions } from "../../../api";

const ExamScreen = (props) => {
  const [examId, setExamId] = useState("");
  const [examData, setExamData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (props?.match?.params?.id) {
      setExamId(props?.match?.params?.id);
      const fetchExamData = async () => {
        try {
          const data = await getexamQuestions(props?.match?.params?.id);
          const initialSelectedOptions = data.questions.map(() => []);
          setSelectedOptions(initialSelectedOptions);
          setExamData(data);
        } catch (error) {
          console.error("Error fetching exam data:", error);
        }
      };
      fetchExamData();
    }

    return () => {};
  }, [props?.match?.params?.id]);

  const handleOptionChange = (optionId) => {
    const updatedSelectedOptions = [...selectedOptions];
    if (examData.questions[currentQuestion].questiontype === "1") {
      updatedSelectedOptions[currentQuestion] = [
        ...updatedSelectedOptions[currentQuestion],
        optionId,
      ];
    } else {
      updatedSelectedOptions[currentQuestion] = [optionId];
    }
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Prepare the submitted answers object
    console.log();
    const studentData = JSON.parse(localStorage.getItem("user"));
    const answers = {
      examId: examId,
      student_id: studentData.id, // Get student ID from local storage
      answers: selectedOptions.map((optionIds, index) => ({
        questionId: examData.questions[index].id,
        selectedOptionIds: optionIds,
      })),
    };
    // Store or send the 'answers' object as needed
    console.log("Submitted Answers:", answers);
  };

  if (!examData) {
    return <div>Loading exam data...</div>;
  }

  const currentQuestionData = examData.questions[currentQuestion];
  const options = JSON.parse(currentQuestionData.options);

  const availableHeight = window.innerHeight - 10; // You can adjust the value (100) as needed

  return (
    <div className="container mt-5">
      <Row>
        <Col xl={12}>
          <Card style={{ height: `${availableHeight}px` }}>
            <Card.Body>
              <h3>{currentQuestionData.questiontext}</h3>
              <Form.Group controlId="formOptions">
                {options.map((option) => (
                  <Form.Check
                    key={option.id}
                    type={
                      currentQuestionData.questiontype === "1"
                        ? "checkbox"
                        : "radio"
                    }
                    label={option.text}
                    onChange={() => handleOptionChange(option.id)}
                    checked={selectedOptions[currentQuestion].includes(
                      option.id
                    )}
                  />
                ))}
              </Form.Group>
              <Button variant="secondary" onClick={handlePreviousQuestion}>
                Previous
              </Button>{" "}
              <Button variant="primary" onClick={handleNextQuestion}>
                Next
              </Button>{" "}
              {currentQuestion === examData.questions.length - 1 && (
                <Button variant="success" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          {/* Display question numbers and their answer status here */}
        </Col>
      </Row>
    </div>
  );
};

export default ExamScreen;
