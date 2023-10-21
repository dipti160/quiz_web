import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  createStudentResponse,
  createstudentDisqualified,
  getexamQuestions,
} from "../../../api";

const ExamScreen = (props) => {
  const [examId, setExamId] = useState("");
  const [examData, setExamData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const intervalRef = useRef(null);

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

    const studentDataForhandleVisibilityChange = JSON.parse(
      localStorage.getItem("user")
    );
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        await createstudentDisqualified({
          exam_id: props?.match?.params?.id,
          student_id: studentDataForhandleVisibilityChange.id,
        });
        handleLogout();
      }
    };

    const handleLogout = () => {
      localStorage.clear();
      props.history.push("/login"); // Redirect to login page
    };

    const handleWindowFocus = () => {
      // You can implement session timeout logic here if needed
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleWindowFocus);
      clearInterval(intervalRef.current);
    };
  }, [props?.match?.params?.id]);

  useEffect(() => {
    if (examData && !isSubmitted) {
      const examDuration = parseInt(examData.exam.duration, 10) * 60 * 1000; // Duration in milliseconds

      const startTime = Date.now();
      const endTime = startTime + examDuration;

      intervalRef.current = setInterval(() => {
        const remainingTime = Math.max(0, endTime - Date.now());
        setTimer(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(intervalRef.current);
          setIsSubmitted(true);
          for (let i = 0; i < examData.questions.length; i++) {
            updateSelectedOptions(i, 0); // You can set a default option ID here if needed
          }
          handleSubmit();
          setTimeout(() => {
            props.history.push("/student/dashboard");
          }, 60000);
        }
      }, 1000);

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [examData, isSubmitted, props.history, selectedOptions]);

  const updateSelectedOptions = (questionIndex, optionId) => {
    const updatedOptions = [...selectedOptions];
    const questionType = examData.questions[questionIndex].questiontype;

    if (questionType === "1") {
      if (updatedOptions[questionIndex].includes(optionId)) {
        updatedOptions[questionIndex] = updatedOptions[questionIndex].filter(
          (id) => id !== optionId
        );
      } else {
        updatedOptions[questionIndex] = [
          ...updatedOptions[questionIndex],
          optionId,
        ];
      }
    } else {
      updatedOptions[questionIndex] = [optionId];
    }

    setSelectedOptions(updatedOptions);
  };

  const handleOptionChange = (optionId) => {
    updateSelectedOptions(currentQuestion, optionId);
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
    const studentData = JSON.parse(localStorage.getItem("user"));
    const answers = {
      exam_id: examId,
      student_id: studentData.id,
      answers: selectedOptions.map((optionIds, index) => ({
        questionId: examData.questions[index].id,
        selectedOptionIds: optionIds,
      })),
    };

    console.log("Submitted Answers:", answers);
    const res = await createStudentResponse(answers);
    if (res?.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        props.history.push("/student/dashboard");
      }, 10000);
    }
  };

  if (!examData && !timer) {
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
            <Card.Header>
              <h4>
                Time Remaining:{" "}
                {timer
                  ? `${Math.floor(timer / (1000 * 60))} min ${Math.floor(
                      (timer / 1000) % 60
                    )} sec`
                  : "0 min 0 sec"}
              </h4>
            </Card.Header>
            <Card.Body>
              {isSubmitted ? (
                <div className="alert alert-success">
                  Your responses have been submitted.
                </div>
              ) : (
                <>
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
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExamScreen;
