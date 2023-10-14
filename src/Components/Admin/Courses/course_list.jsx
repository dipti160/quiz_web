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
import { listCourses, deleteCourse } from "../../../api";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await listCourses();

        setCourses(response);
      } catch (error) {
        console.error("Error fetching department list:", error);
      }
    };

    fetchCourses();

    return () => {};
  }, []);

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
              <Row>
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
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive style={{ textAlign: "center" }} bordered>
                <thead>
                  {courses?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>Courses</th>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default CourseList;
