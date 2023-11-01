import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

import { Alert } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../../../api";

const DepartmentForm = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fecthDepartmentById = async (id) => {
      try {
        const res = await getDepartmentById(id);
        if (res?.name) {
          setName(res.name);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (props?.match?.params?.id) {
      setId(props.match.params.id);
      fecthDepartmentById(props.match.params.id);
    }

    return () => {};
  }, [props?.match?.params]);

  const handleSubmit = async () => {
    try {
      if (id) {
        if (name?.length) {
          const data = {
            name: name,
          };
          const res = await updateDepartment(id, data);
          if (Object.values(res)?.length) {
            props.history.push("/admin/department/list");
          }
        }
      } else {
        if (name?.length) {
          const data = {
            name: name,
          };

          const res = await createDepartment(data);

          if (Object.values(res)?.length) {
            props.history.push("/admin/department/list");
          } else {
            console.log("Authentication failed");
            setError("Department is already exist");
          }
        } else {
          setError("Please enter department name");
        }
      }
    } catch (err) {
      console.log("Error occurred while authenticating: ", err);
    }
  };
  return (
    <Aux>
      {error ? <Alert variant="danger">{error}</Alert> : ""}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Please enter department here</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Department Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Department"
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
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default DepartmentForm;
