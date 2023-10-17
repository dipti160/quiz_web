import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import {
  createStudent,
  createStudentByInstructor,
  getAllDepartment,
  getStudentById,
  getStudentByIdByInstructor,
  listCourses,
  updateStudent,
  updateStudentByInstructor,
} from "../../../api";

const InstructorStudentForm = (props) => {
  const [id, setId] = useState(0);
  const [departmentId, setDepartmentId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const instructorData = JSON.parse(localStorage.getItem("user"));

      if (
        instructorData?.id &&
        instructorData?.usercourse[0]?.course_id &&
        instructorData?.UserDepartment[0]?.department_id
      ) {
        setCourseId(instructorData?.usercourse[0]?.course_id);
        setDepartmentId(instructorData?.UserDepartment[0]?.department_id);
        setInstructorId(instructorData.id);
      }

      try {
        if (props?.match?.params?.id) {
          const studentData = await getStudentByIdByInstructor(
            props.match.params.id
          );
          setFirstName(studentData.firstname);
          setLastName(studentData.lastname ? studentData.lastname : "");
          setPhoneNumber(
            studentData.phonenumber ? studentData.phonenumber : ""
          );
          setEmail(studentData.email);
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
            phonenumber: phoneNumber ? phoneNumber : null,
            email: email,
            course_id: courseId,
            department_id: departmentId,
            instructor_id: instructorId,
          };
          const res = await updateStudentByInstructor(id, data);
          if (Object.values(res)?.length) {
            props.history.push("/instructor/student/list");
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
            phonenumber: phoneNumber ? phoneNumber : null,
            email: email,
            course_id: courseId,
            department_id: departmentId,
            instructor_id: instructorId,
          };

          const res = await createStudentByInstructor(data);
          if (Object.values(res)?.length) {
            props.history.push("/instructor/student/list");
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
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default InstructorStudentForm;
