import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Pagination,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import { viewExamResults } from "../../../api";

const StudentResult = (props) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await viewExamResults(props?.match?.params?.id);
        setStudents(response);
      } catch (error) {
        console.log("Error fetching department list:", error);
      }
    };

    fetchStudents();
    return () => {};
  }, [props?.match?.params?.id]);

  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Student Result</Card.Title>
              {/* <Row>
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
              </Row> */}
            </Card.Header>
            <Card.Body>
              <Table responsive style={{ textAlign: "center" }} bordered>
                <thead>
                  {students?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Result</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {students?.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student?.name}</td>
                        <td>{student?.email}</td>
                        <td>{student?.result}</td>
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
              <Pagination size="lg">
                <Pagination.Prev disabled={true} />
                <Pagination.Next disabled={true} />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default StudentResult;
