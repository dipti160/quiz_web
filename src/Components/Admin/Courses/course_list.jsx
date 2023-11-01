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
import { listCourses, deleteCourse } from "../../../api";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCourses();

    return () => {};
  }, [page, limit]);

  const fetchCourses = async () => {
    try {
      const response = await listCourses(page, limit);
      setCourses(response?.data);
      setTotalPages(response?.totalPages);
    } catch (error) {
      console.error("Error fetching department list:", error);
    }
  };

  const formattedNumber = (id) => {
    const newCourseId = String(id).padStart(4, "0");
    return newCourseId;
  };

  const handleDelete = async (id) => {
    const res = await deleteCourse(id);
    console.log(res);
    if (res?.message) {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );
    }
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Courses</Card.Title>
              {/* <Row>
                <Col md={6}></Col>
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      placeholder="Enter Course name"
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
                  {courses?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>Courses</th>
                      <th>Courses Number</th>
                      <th>Departments</th>
                      <th>Action</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  {courses?.length > 0 ? (
                    courses.map((course, index) => (
                      <tr key={course.id}>
                        <td>{index + 1}</td>
                        <td>{course.name}</td>
                        <td>{formattedNumber(course.id)}</td>
                        <td>{course?.Department?.name}</td>
                        <td>
                          <Link
                            to={`/admin/course/edit/${course.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <Button variant={"success"}>Edit</Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={(e) => handleDelete(course.id)}
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

export default CourseList;
