import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import {
  createQuestion,
  getExams,
  getQuestionById,
  updateQuestion,
} from "../../../api";

const QuestionForm = (props) => {
  const [id, setId] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [examId, setExamId] = useState("");
  const [marks, setMarks] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [examOptions, setExamOptions] = useState(null);
  const [instructorId, setInstructorId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState(null);

  const [questionTypeOptions, setQuestionTypeOptions] = useState([
    { id: 1, label: "Multiple Selection" },
    { id: 2, label: "Single Selection" },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const instructorData = JSON.parse(localStorage.getItem("user"));
      setInstructorId(instructorData.id);

      try {
        if (props?.match?.params?.id) {
          const questionData = await getQuestionById(props.match.params.id);
          setId(questionData.id);
          setQuestion(questionData.questiontext);

          const parsedOptions = JSON.parse(questionData.options);
          setOptions(parsedOptions);
          const parsedCorrectAnswer = JSON.parse(questionData.correctanswer);
          setCorrectAnswer(parsedCorrectAnswer);

          setExamId(questionData.exam_id);
          setMarks(questionData.marks);
          setQuestionType(questionData.questiontype);
        }
        const examData = await getExams(instructorData.id);
        if (examData.length) {
          setExamOptions(
            examData.map((exam) => ({
              id: exam.id,
              label: exam.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [props?.match?.params?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOptionChange = (text, index) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = text;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    const newOptionId = options.length + 1;
    setOptions([...options, { id: newOptionId, text: "" }]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((option, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    try {
      if (id) {
        console.log(instructorId !== "");
        if (
          question &&
          options?.length &&
          correctAnswer?.length &&
          questionType &&
          marks &&
          instructorId !== ""
        ) {
          const data = {
            questiontext: question,
            options: options,
            correctanswer: correctAnswer,
            questiontype: questionType,
            marks: marks,
            course_id: courseId,
            exam_id: examId,
            instructor_id: instructorId,
          };
          const res = await updateQuestion(id, data);
          if (Object.values(res)?.length) {
            props.history.push("/instructor/question/list");
          }
        }
      } else {
        if (
          question &&
          options?.length &&
          correctAnswer?.length &&
          questionType &&
          marks &&
          instructorId !== ""
        ) {
          const data = {
            questiontext: question,
            options: options,
            correctanswer: correctAnswer,
            questiontype: questionType,
            marks: marks,
            course_id: courseId,
            exam_id: examId,
            instructor_id: instructorId,
          };
          const res = await createQuestion(data);
          if (Object.values(res)?.length) {
            if (res?.total) {
              setError("Question marks exceed the total marks limit of exam.");
            }
            if (res?.data) {
              props.history.push("/instructor/question/list");
            }
          }
        }
      }
    } catch (err) {
      console.log("Error occurred while authenticating: ", err);
    }
  };

  return (
    <Aux>
      {error ? <Alert variant="danger">{error}</Alert> : ""}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Please create exam questions here</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="exampleForm.textarea">
                <Form.Label>Question Text</Form.Label>
                <Form.Control
                  as="textarea"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </Form.Group>
              <Row>
                <Col md={4}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Quiz</Form.Label>
                      <Form.Control
                        as="select"
                        value={examId}
                        onChange={(e) => setExamId(e.target.value)}
                      >
                        <option value="">Select Quiz</option>
                        {examOptions?.length &&
                          examOptions.map((exam) => (
                            <option key={exam.id} value={exam.id}>
                              {exam.label}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Marks</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Marks"
                      value={marks}
                      onChange={(e) => setMarks(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Question Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                    >
                      <option value="">Select Question Type</option>
                      {questionTypeOptions.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              {options.map((option, index) => (
                <div key={option.id}>
                  <Form.Group controlId={`option-${index}`}>
                    <Form.Label>{`Option ${index + 1}`}</Form.Label>
                    <Row>
                      <Col md={10}>
                        <Form.Control
                          type="text"
                          placeholder={`Enter option ${index + 1}`}
                          value={option.text}
                          onChange={(e) =>
                            handleOptionChange(e.target.value, index)
                          }
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="danger"
                          onClick={() => removeOption(index)}
                        >
                          <i
                            className="fa fa-minus"
                            aria-hidden="true"
                            style={{ marginRight: "2px" }}
                          ></i>
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </div>
              ))}
              <Button variant="secondary" onClick={addOption}>
                Add Option
              </Button>

              <Form.Group controlId="exampleForm.ControlSelect3">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={correctAnswer}
                  style={{
                    width: "100%",
                    height: "50px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    padding: "8px",
                    fontSize: "14px",
                    color: "#495057",
                  }}
                  onChange={(e) =>
                    setCorrectAnswer(
                      Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      )
                    )
                  }
                >
                  {options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {`Option ${option.id}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default QuestionForm;
