import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

import Aux from "../../../hoc/_Aux";

const CourseForm = () => {
  return (
    <Aux>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Please enter course here</Card.Title>
            </Card.Header>
            <Card.Body>
              {/* <h5>Form controls</h5> */}
              {/* <hr /> */}
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Course Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Course" />
                    </Form.Group>

                    <Button variant="primary">Submit</Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Department</Form.Label>
                    <Form.Control as="select">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
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
