import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

import Aux from "../../../hoc/_Aux";
import { createExam, getExamById, updateExam } from "../../../api";

const ExamForm = (props) => {
  const [id, setId] = useState(0);
  const [examName, setExamName] = useState("");
  const [examDuration, setExamDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalMarks, setTotalMarks] = useState(0);
  const [instrcution, setInstruction] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const instructorData = JSON.parse(localStorage.getItem("user"));

      if (instructorData?.id && instructorData?.usercourse[0]?.course_id) {
        setCourseId(instructorData?.usercourse[0]?.course_id);
        setInstructorId(instructorData.id);
      }

      try {
        if (props?.match?.params?.id) {
          setId(props?.match?.params?.id);
          const examData = await getExamById(props.match.params.id);

          if (examData) {
            setExamName(examData?.name);
            setExamDuration(examData?.duration);

            setTotalMarks(examData?.totalmarks);
            setInstruction(examData?.instruction);

            const s_date = new Date(examData.startdate);
            const e_date = new Date(examData.enddate);

            const formatDate = (date) => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");

              return `${month}-${day}-${year} `;
            };

            const formattedStartDate = formatDate(s_date);
            const formattedEndDate = formatDate(e_date);
            setStartDate(formattedStartDate);
            setEndDate(formattedEndDate);
          } else {
            console.log("No data in exam");
          }
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
      if (!examName) {
        setError("Exam Name is required");
        return;
      }

      if (!startDate) {
        setError("Start Date is required");
        return;
      }

      // const userTimeZone = "America/Los_Angeles";

      // const currentDate = new Date(
      //   new Date().toLocaleString("en-US", { timeZone: userTimeZone })
      // );
      // const selectedStartDate = new Date(startDate).toLocaleString("en-US", {
      //   timeZone: userTimeZone,
      // });
      // console.log(selectedStartDate);
      // console.log(currentDate, "currentDate");
      // if (selectedStartDate < currentDate) {
      //   setError("Start Date cannot be in the past");
      //   return;
      // }

      if (!endDate) {
        setError("End Date is required");
        return;
      }

      if (examDuration <= 0) {
        setError("Exam Duration should be greater than zero");
        return;
      }

      if (totalMarks <= 0) {
        setError("Total Marks should be greater than zero");
        return;
      }
      if (id) {
        if (examName && examDuration && startDate && endDate && totalMarks) {
          const data = {
            name: examName,
            duration: examDuration,
            startdate: startDate,
            enddate: endDate,
            totalmarks: totalMarks,
            instruction: instrcution ? instrcution : null,
          };
          const res = await updateExam(id, data);
          if (Object.values(res)?.length) {
            props.history.push("/instructor/exam/list");
          }
        }
      } else {
        if (
          examName &&
          examDuration &&
          startDate &&
          endDate &&
          totalMarks &&
          courseId !== ""
        ) {
          const data = {
            name: examName,
            duration: examDuration,
            startdate: startDate,
            enddate: endDate,
            totalmarks: totalMarks,
            instruction: instrcution ? instrcution : null,
            instructor_id: instructorId,
            course_id: courseId,
          };
          const res = await createExam(data);
          if (Object.values(res)?.length) {
            props.history.push("/instructor/exam/list");
          }
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
              <Card.Title as="h5">Please create quiz here</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Quiz Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Exam Name"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label>Total Marks</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Total Marks"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Quiz Duration</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter exam duration"
                      value={examDuration}
                      onChange={(e) => setExamDuration(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                  {/* <Form.Group controlId="exampleForm.textarea">
                    <Form.Label>Quiz Instrcution</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Exam Instrcution"
                      value={instrcution}
                      onChange={(e) => setInstruction(e.target.value)}
                    />
                  </Form.Group> */}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  );
};

export default ExamForm;
