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
import {
  deleteStudentByInstructor,
  listStudentsByInstructor,
} from "../../../api";

const InstructorStudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const instructorData = JSON.parse(localStorage.getItem("user"));

    const fetchStudents = async () => {
      try {
        if (instructorData?.id) {
          const response = await listStudentsByInstructor(instructorData?.id);
          setStudents(response);
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
    const res = await deleteStudentByInstructor(id);

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
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Action</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {students?.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student.id}>
                        <td>{index + 1}</td>
                        <td>{student?.firstname}</td>
                        <td>{student?.lastname}</td>
                        <td>{student?.email}</td>
                        <td>{student?.phonenumber}</td>
                        <td>
                          <Link
                            to={`/instructor/student/edit/${student.id}`}
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

export default InstructorStudentList;
