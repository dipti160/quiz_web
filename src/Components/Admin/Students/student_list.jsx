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
import { deleteStudent, listStudents } from "../../../api";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await listStudents();
        setStudents(response);
      } catch (error) {
        console.log("Error fetching department list:", error);
      }
    };

    fetchStudents();

    return () => {};
  }, []);

  const handleDelete = async (id) => {
    const res = await deleteStudent(id);

    if (res?.message) {
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
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
                  {students?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Email</th>
                      <th>Course</th>
                      <th>Department</th>
                      <th>Action</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {students?.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student.firstname}</td>
                        <td>{student.email}</td>
                        <td>{student?.UserCourses[0]?.Course?.name}</td>
                        <td>{student?.UserDepartments[0]?.Department?.name}</td>
                        <td>
                          <Link
                            to={`/student/edit/${student.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <Button variant={"success"}>Edit</Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={(e) => handleDelete(student.id)}
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

export default StudentList;
