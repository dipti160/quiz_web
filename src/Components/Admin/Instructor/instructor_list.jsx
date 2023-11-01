import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Aux from "../../../hoc/_Aux";
import { deleteInstructor, listInstructors } from "../../../api";

const InstructorList = () => {
  const [instrcutors, setInstructors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchInstructors();

    return () => {};
  }, [page, limit]);

  const fetchInstructors = async () => {
    try {
      const response = await listInstructors(page, limit);
      setInstructors(response?.data);
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
    const res = await deleteInstructor(id);

    if (res?.message) {
      setInstructors((prevInstructors) =>
        prevInstructors.filter((instructor) => instructor.id !== id)
      );
    }
  };
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Instrcutors</Card.Title>
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
                  {instrcutors?.length > 0 && (
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
                  {instrcutors?.length > 0 ? (
                    instrcutors.map((instrcutor, index) => (
                      <tr key={instrcutor.id}>
                        <td>{index + 1}</td>
                        <td>{instrcutor.firstname}</td>
                        <td>{instrcutor.email}</td>

                        <td>
                          {instrcutor?.UserCourses[0]?.Course?.name +
                            "-" +
                            formattedNumber(
                              instrcutor?.UserCourses[0]?.course_id
                            )}
                        </td>
                        <td>
                          {instrcutor?.UserDepartments[0]?.Department?.name}
                        </td>
                        <td>
                          <Link
                            to={`/admin/instructor/edit/${instrcutor.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <Button variant={"success"}>Edit</Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={(e) => handleDelete(instrcutor.id)}
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

export default InstructorList;
