import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  getUpcomingExams,
  deleteExam,
  getPastExams,
  getExamsPastInstructor,
  evaluateExamResult,
} from "../../../api";
import Aux from "../../../hoc/_Aux";
import Loader from "../../../App/layout/Loader";

const PastExamInstructor = () => {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const studentData = JSON.parse(localStorage.getItem("user"));
        if (studentData?.id) {
          const response = await getExamsPastInstructor(studentData?.id);
          setExams(response);
        } else {
          console.log("User data is not set");
        }
      } catch (error) {
        console.log("Error fetching exams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();

    return () => {};
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}-${day}-${year} `;
  };

  const handleEvaluate = async (id) => {
    try {
      const res = await evaluateExamResult(id);
      console.log(res);
    } catch (error) {
      console.log("Error deleting exam:", error);
    }
  };

  return (
    <Aux>
      <h5>Past Exams</h5>
      {isLoading ? (
        <Loader />
      ) : (
        <Table responsive bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Exam Name</th>
              <th>Exam Duration</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map((exam, index) => (
                <tr key={exam.id}>
                  <td>{index + 1}</td>
                  <td>{exam.name}</td>
                  <td>{exam.duration}</td>
                  <td>
                    {exam.startdate ? formatDate(new Date(exam.startdate)) : ""}
                  </td>
                  <td>
                    {exam.enddate ? formatDate(new Date(exam.enddate)) : ""}
                  </td>
                  <td>{exam.totalmarks}</td>

                  <td>
                    <Link
                      to={`/instructor/result/list/${exam.id}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      <Button variant="success">View Result</Button>
                    </Link>
                    <Button
                      variant="secondary"
                      onClick={() => handleEvaluate(exam.id)}
                    >
                      Evaluate
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No upcoming exams found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Aux>
  );
};

export default PastExamInstructor;
