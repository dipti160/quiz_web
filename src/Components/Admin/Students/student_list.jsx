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
import { Link } from "react-router-dom";

import Aux from "../../../hoc/_Aux";
import { deleteStudent, listStudents } from "../../../api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchStudents();

    return () => {};
  }, [page, limit]);

  const fetchStudents = async () => {
    try {
      const response = await listStudents(page, limit);
      setStudents(response?.data);
      setTotalPages(response?.totalPages);
    } catch (error) {
      console.log("Error fetching department list:", error);
    }
  };

  const formattedNumber = (id) => {
    const newCourseId = String(id).padStart(4, "0");
    return newCourseId;
  };

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
                      <th>Email</th>
                      <th>Course</th>
                      <th>Department</th>
                      {/* <th>Action</th> */}
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
                        <td>
                          {student?.UserCourses[0]?.Course?.name +
                            "-" +
                            formattedNumber(student?.UserCourses[0]?.course_id)}
                        </td>
                        <td>{student?.UserDepartments[0]?.Department?.name}</td>
                        {/* <td>
                          <Link
                            to={`/admin/student/edit/${student.id}`}
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
                        </td> */}
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

export default StudentList;
