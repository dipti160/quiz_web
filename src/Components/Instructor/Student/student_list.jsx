import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Pagination,
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
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [instructorData, setInstructorData] = useState(null);

  useEffect(() => {
    const instructorDataLocal = JSON.parse(localStorage.getItem("user"));
    setInstructorData(instructorDataLocal);
    const fetchStudents = async () => {
      try {
        if (instructorDataLocal?.id) {
          const response = await listStudentsByInstructor(
            instructorDataLocal?.id,
            page,
            limit
          );
          // setStudents(response);
          setStudents(response?.data);
          setTotalPages(response?.totalPages);
        } else {
          console.log("Instructor data is not set");
        }
      } catch (error) {
        console.log("Error fetching department list:", error);
      }
    };

    fetchStudents();

    return () => {};
  }, [page, limit]);

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
              <Card.Title as="h5">Students</Card.Title>
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
              <Pagination size="lg">
                <Pagination.Prev
                  onClick={() => setPage(Math.max(page - 1, 1))}
                  disabled={page === 1}
                />
                <Pagination.Next
                  onClick={() => setPage(Math.min(page + 1, totalPages))}
                  disabled={page === totalPages}
                />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default InstructorStudentList;
