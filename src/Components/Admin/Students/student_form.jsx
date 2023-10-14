import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import {
  createStudent,
  getAllDepartment,
  getStudentById,
  listCourses,
  updateStudent,
} from "../../../api";

const StudentForm = (props) => {
  const [id, setId] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDepartment();
        setDepartments(response);

        const res = await listCourses();
        setCourses(res);

        if (props?.match?.params?.id) {
          const instrcutorData = await getStudentById(props.match.params.id);
          setFirstName(instrcutorData.firstname);
          setLastName(instrcutorData.lastname ? instrcutorData.lastname : "");
          setPhoneNumber(
            instrcutorData.phonenumber ? instrcutorData.phonenumber : ""
          );

          setEmail(instrcutorData.email);
          setCourseId(instrcutorData?.UserCourses[0]?.course_id);
          setDepartmentId(instrcutorData?.UserDepartments[0]?.department_id);
          setId(props?.match?.params?.id);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, [props?.match?.params?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredCourses = courses.filter(
    (course) => course.department_id == departmentId
  );

  const handleSubmit = async () => {
    try {
      if (id) {
        if (
          firstName?.length &&
          email?.length &&
          courseId !== "" &&
          departmentId !== ""
        ) {
          const data = {
            firstname: firstName,
            lastname: lastName ? lastName : null,
            phone_number: phoneNumber ? phoneNumber : null,
            email: email,
            course_id: courseId,
            department_id: departmentId,
          };
          const res = await updateStudent(id, data);
          if (Object.values(res)?.length) {
            props.history.push("/admin/student/list");
          }
        }
      } else {
        if (
          firstName?.length &&
          email?.length &&
          courseId !== "" &&
          departmentId !== ""
        ) {
          const data = {
            firstname: firstName,
            lastname: lastName ? lastName : null,
            phone_number: phoneNumber ? phoneNumber : null,
            email: email,
            course_id: courseId,
            department_id: departmentId,
          };

          const res = await createStudent(data);
          if (Object.values(res)?.length) {
            props.history.push("/admin/student/list");
          }
        }
      }
    } catch (err) {
      console.log("Error occurred while authenticating: ", err);
    }
  };

  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Please add student here</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Department</Form.Label>
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
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Course</Form.Label>
                    <Form.Control
                      as="select"
                      onClick={(e) => setCourseId(e.target.value)}
                      defaultValue={props.match.params.id ? courseId : ""}
                    >
                      <option value="">Select Course</option>
                      {filteredCourses.map((course) => (
                        <option key={course.id} value={String(course.id)}>
                          {course.name}
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

export default StudentForm;
