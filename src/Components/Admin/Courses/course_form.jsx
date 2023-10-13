import React, { useEffect, useState } from "react";

import { Row, Col, Card, Form, Button } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import {
  createCourse,
  getCourseById,
  updateCourse,
  getAllDepartment,
} from "../../../api";

const CourseForm = (props) => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const response = await listDepartments();
  //       setDepartments(response);
  //     } catch (error) {
  //       console.error("Error fetching department list:", error);
  //     }
  //   };

  //   fetchDepartments();

  //   const fecthCourseById = async (id) => {
  //     try {
  //       const res = await getCourseById(id);
  //       if (res?.name) {
  //         setName(res.name);
  //         setDepartmentId(res.department_id);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (props?.match?.params?.id) {
  //     setId(props.match.params.id);
  //     fecthCourseById(props.match.params.id);
  //   }

  //   return () => {};
  // }, [props?.match?.params?.id]);

  // useEffect(() => {
  //   const fecthCourseById = async (id) => {
  //     try {
  //       const res = await getCourseById(id);
  //       if (res?.name) {
  //         setName(res.name);
  //         setDepartmentId(res.department_id);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (props?.match?.params?.id) {
  //     setId(props.match.params.id);
  //     fecthCourseById(props.match.params.id);
  //   }
  //   return () => {};
  // }, [props?.match?.params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDepartment();
        setDepartments(response);

        if (props?.match?.params?.id) {
          const courseData = await getCourseById(props.match.params.id);
          setId(props?.match?.params?.id);
          setName(courseData.name);
          setDepartmentId(courseData.department_id);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [props?.match?.params?.id]);

  const handleSubmit = async () => {
    try {
      if (id) {
        if (name?.length && departmentId !== "") {
          const data = {
            name: name,
            department_id: departmentId,
          };
          const res = await updateCourse(id, data);
          if (Object.values(res)?.length) {
            props.history.push("/course/list");
          }
        }
      } else {
        if (name?.length && departmentId !== "") {
          const data = {
            name: name,
            department_id: departmentId,
          };

          const res = await createCourse(data);
          if (Object.values(res)?.length) {
            props.history.push("/course/list");
          }
        }
      }
    } catch (err) {
      console.log("Error occurred while authenticating: ", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Please enter course here</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Course Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Course"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        value={`${name}`}
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Department</Form.Label>

                    <Form.Control
                      as="select"
                      onClick={(e) => setDepartmentId(e.target.value)}
                      defaultValue={props.match.params.id ? departmentId : ""}
                    >
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option
                          key={department.id}
                          value={String(department.id)}
                        >
                          {department.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default CourseForm;
