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
import { deleteExam, getExams } from "../../../api";

const ExamList = () => {
  const [exams, setExam] = useState([]);

  useEffect(() => {
    const instructorData = JSON.parse(localStorage.getItem("user"));

    const fetchExams = async () => {
      try {
        if (instructorData?.id) {
          const response = await getExams(instructorData?.id);
          setExam(response);
        } else {
          console.log("exams data is not set");
        }
      } catch (error) {
        console.log("Error fetching department list:", error);
      }
    };

    fetchExams();

    return () => {};
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}-${day}-${year} `;
  };

  const handleDelete = async (id) => {
    const res = await deleteExam(id);

    if (res?.message) {
      setExam((prevExams) => prevExams.filter((exam) => exam.id !== id));
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
                  {exams?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>Exam Name</th>
                      <th>Exam Duration</th>
                      <th>Start Date</th>
                      <th>Total Marks</th>
                      <th>Exam Status</th>
                      <th>Actions</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {exams?.length > 0 ? (
                    exams.map((exam, index) => (
                      <tr key={exam.id}>
                        <td>{index + 1}</td>
                        <td>{exam?.name}</td>
                        <td>{exam?.duration}</td>
                        <td>
                          {exam?.startdate
                            ? formatDate(new Date(exam.startdate))
                            : ""}
                        </td>
                        <td>{exam?.totalmarks}</td>
                        <td>{exam?.examstatus}</td>
                        <td>
                          <Link
                            to={`/instructor/exam/edit/${exam.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <Button variant={"success"}>Edit</Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={(e) => handleDelete(exam.id)}
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

export default ExamList;
