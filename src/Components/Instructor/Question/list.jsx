import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Aux from "../../../hoc/_Aux";
import { deleteQuestion, getquestions } from "../../../api";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const instructorData = JSON.parse(localStorage.getItem("user"));

    const fetchStudents = async () => {
      try {
        if (instructorData?.id) {
          const response = await getquestions(instructorData?.id);
          setQuestions(response);
        } else {
          console.log("Instructor data is not set");
        }
      } catch (error) {
        console.log("Error fetching department list:", error);
      }
    };

    fetchStudents();

    return () => {};
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteQuestion(id);

    if (res?.message) {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((questions) => questions.id !== id)
      );
    }
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col md={6}></Col>
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                      <Button variant="info">Search</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive style={{ textAlign: "center" }} bordered>
                <thead>
                  {questions?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>Question</th>
                      <th>Exam Name</th>
                      <th>Actions</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {questions?.length > 0 ? (
                    questions.map((question, index) => (
                      <tr key={question.id}>
                        <td>{index + 1}</td>
                        <td>{question?.questiontext}</td>
                        <td>{question?.Exam?.name}</td>
                        <td>
                          <Link
                            to={`/instructor/question/edit/${question.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <Button variant={"success"}>Edit</Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={(e) => handleDelete(question.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        cell={3}
                        style={{ border: "none", fontSize: "large" }}
                      >
                        No Record Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default QuestionList;
