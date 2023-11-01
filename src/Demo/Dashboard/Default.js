import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

import {
  coursesCount,
  departmentsCount,
  examsCount,
  instructorCount,
  studentCount,
  examsUpcomingCount,
  examsForDashboard,
} from "../../api";

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userRole = localStorage.getItem("role");

  const [counts, setCounts] = useState({
    courses: 0,
    departments: 0,
    exams: 0,
    instructors: 0,
    students: 0,
    upcomingExams: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(userData?.id);
    const fetchData = async () => {
      const courses = await coursesCount();
      const departments = await departmentsCount();
      const exams = await examsCount();
      const instructors = await instructorCount();
      const students = await studentCount();
      const upcomingExams = await examsUpcomingCount();

      const data = await examsForDashboard();
      setRecentUsers(data);

      setCounts({
        courses: courses?.count,
        departments: departments?.count,
        exams: exams?.count,
        instructors: instructors?.count,
        students: students?.count,
        upcomingExams: upcomingExams?.count,
      });
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  // const tabContent = (
  //   <Aux>
  //     <div className="media friendlist-box align-items-center justify-content-center m-b-20">
  //       <div className="m-r-10 photo-table">
  //         <a href={DEMO.BLANK_LINK}>
  //           <img
  //             className="rounded-circle"
  //             style={{ width: "40px" }}
  //             src={avatar1}
  //             alt="activity-user"
  //           />
  //         </a>
  //       </div>
  //       <div className="media-body">
  //         <h6 className="m-0 d-inline">Silje Larsen</h6>
  //         <span className="float-right d-flex  align-items-center">
  //           <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
  //           3784
  //         </span>
  //       </div>
  //     </div>
  //     <div className="media friendlist-box align-items-center justify-content-center m-b-20">
  //       <div className="m-r-10 photo-table">
  //         <a href={DEMO.BLANK_LINK}>
  //           <img
  //             className="rounded-circle"
  //             style={{ width: "40px" }}
  //             src={avatar2}
  //             alt="activity-user"
  //           />
  //         </a>
  //       </div>
  //       <div className="media-body">
  //         <h6 className="m-0 d-inline">Julie Vad</h6>
  //         <span className="float-right d-flex  align-items-center">
  //           <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
  //           3544
  //         </span>
  //       </div>
  //     </div>
  //     <div className="media friendlist-box align-items-center justify-content-center m-b-20">
  //       <div className="m-r-10 photo-table">
  //         <a href={DEMO.BLANK_LINK}>
  //           <img
  //             className="rounded-circle"
  //             style={{ width: "40px" }}
  //             src={avatar3}
  //             alt="activity-user"
  //           />
  //         </a>
  //       </div>
  //       <div className="media-body">
  //         <h6 className="m-0 d-inline">Storm Hanse</h6>
  //         <span className="float-right d-flex  align-items-center">
  //           <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
  //           2739
  //         </span>
  //       </div>
  //     </div>
  //     <div className="media friendlist-box align-items-center justify-content-center m-b-20">
  //       <div className="m-r-10 photo-table">
  //         <a href={DEMO.BLANK_LINK}>
  //           <img
  //             className="rounded-circle"
  //             style={{ width: "40px" }}
  //             src={avatar1}
  //             alt="activity-user"
  //           />
  //         </a>
  //       </div>
  //       <div className="media-body">
  //         <h6 className="m-0 d-inline">Frida Thomse</h6>
  //         <span className="float-right d-flex  align-items-center">
  //           <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
  //           1032
  //         </span>
  //       </div>
  //     </div>
  //     <div className="media friendlist-box align-items-center justify-content-center m-b-20">
  //       <div className="m-r-10 photo-table">
  //         <a href={DEMO.BLANK_LINK}>
  //           <img
  //             className="rounded-circle"
  //             style={{ width: "40px" }}
  //             src={avatar2}
  //             alt="activity-user"
  //           />
  //         </a>
  //       </div>
  //       <div className="media-body">
  //         <h6 className="m-0 d-inline">Silje Larsen</h6>
  //         <span className="float-right d-flex  align-items-center">
  //           <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
  //           8750
  //         </span>
  //       </div>
  //     </div>
  //     <div className="media friendlist-box align-items-center justify-content-center">
  //       <div className="m-r-10 photo-table">
  //         <a href={DEMO.BLANK_LINK}>
  //           <img
  //             className="rounded-circle"
  //             style={{ width: "40px" }}
  //             src={avatar3}
  //             alt="activity-user"
  //           />
  //         </a>
  //       </div>
  //       <div className="media-body">
  //         <h6 className="m-0 d-inline">Storm Hanse</h6>
  //         <span className="float-right d-flex  align-items-center">
  //           <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
  //           8750
  //         </span>
  //       </div>
  //     </div>
  //   </Aux>
  // );

  return (
    <Aux>
      {console.log(userRole)}
      {userRole === "admin" && (
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Departments</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.departments}
                    </h1>
                  </div>
                </div>

                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Courses</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-12">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.courses}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Instructors</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.instructors}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Quizzes</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.exams}
                    </h1>
                  </div>
                </div>

                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Students</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-12">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.students}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Upcoming Quizzes</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.upcomingExams}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col> */}

          {/* <Col md={6} xl={4}>
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-facebook text-primary f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>12,281</h3>
                                        <h5 className="text-c-green mb-0">+7.2% <span className="text-muted">Total Likes</span></h5>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>35,098</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>350</h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '45%', height: '6px'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> */}
          {/* <Col md={6} xl={4}>
            <Card className="card-social">
              <Card.Body className="border-bottom">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <i className="fa fa-twitter text-c-blue f-36" />
                  </div>
                  <div className="col text-right">
                    <h3>11,200</h3>
                    <h5 className="text-c-purple mb-0">
                      +6.2% <span className="text-muted">Total Likes</span>
                    </h5>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                  <div className="col-6">
                    <h6 className="text-center m-b-10">
                      <span className="text-muted m-r-5">Target:</span>34,185
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-green"
                        role="progressbar"
                        style={{ width: "40%", height: "6px" }}
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h6 className="text-center  m-b-10">
                      <span className="text-muted m-r-5">Duration:</span>800
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-blue"
                        role="progressbar"
                        style={{ width: "70%", height: "6px" }}
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4}>
            <Card className="card-social">
              <Card.Body className="border-bottom">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <i className="fa fa-google-plus text-c-red f-36" />
                  </div>
                  <div className="col text-right">
                    <h3>10,500</h3>
                    <h5 className="text-c-blue mb-0">
                      +5.9% <span className="text-muted">Total Likes</span>
                    </h5>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                  <div className="col-6">
                    <h6 className="text-center m-b-10">
                      <span className="text-muted m-r-5">Target:</span>25,998
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "80%", height: "6px" }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h6 className="text-center  m-b-10">
                      <span className="text-muted m-r-5">Duration:</span>900
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme2"
                        role="progressbar"
                        style={{ width: "50%", height: "6px" }}
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col> */}
          {/* <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Rating</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="row align-items-center justify-content-center m-b-20">
                  <div className="col-6">
                    <h2 className="f-w-300 d-flex align-items-center float-left m-0">
                      4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                    </h2>
                  </div>
                  <div className="col-6">
                    <h6 className="d-flex  align-items-center float-right m-0">
                      0.4{" "}
                      <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                    </h6>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                    </h6>
                    <h6 className="align-items-center float-right">384</h6>
                    <div
                      className="progress m-t-30 m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "70%" }}
                        aria-valuenow="70"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                    </h6>
                    <h6 className="align-items-center float-right">145</h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "35%" }}
                        aria-valuenow="35"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                    </h6>
                    <h6 className="align-items-center float-right">24</h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "25%" }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>

                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                    </h6>
                    <h6 className="align-items-center float-right">1</h6>
                    <div
                      className="progress m-t-30  m-b-20"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "10%" }}
                        aria-valuenow="10"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <h6 className="align-items-center float-left">
                      <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                    </h6>
                    <h6 className="align-items-center float-right">0</h6>
                    <div
                      className="progress m-t-30  m-b-5"
                      style={{ height: "6px" }}
                    >
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "0%" }}
                        aria-valuenow="0"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col> */}
          {/* <Col className="m-b-30">
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                {tabContent}
              </Tab>
              <Tab eventKey="week" title="This Week">
                {tabContent}
              </Tab>
              <Tab eventKey="all" title="All">
                {tabContent}
              </Tab>
            </Tabs>
          </Col> */}
        </Row>
      )}

      {userRole === "instructor" && (
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Quizzes</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.exams}
                    </h1>
                  </div>
                </div>

                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Students</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-12">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.students}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Upcoming Quizzes</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.upcomingExams}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      )}

      {userRole === "student" && (
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Total Quizzes</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.exams}
                    </h1>
                  </div>
                </div>

                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col>

          {/* <Col xl={4}>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Upcoming Quizzes</h6>
                <div className="row d-flex align-items-center">
                  <div className="col-9">
                    <h1 className="f-w-300 d-flex align-items-center m-b-0">
                      {counts?.upcomingExams}
                    </h1>
                  </div>
                </div>
                <div className="m-t-30" style={{ height: "7px" }}></div>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      )}
    </Aux>
  );
};

export default Dashboard;
