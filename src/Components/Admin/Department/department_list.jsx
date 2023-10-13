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
import { deleteDepartment, listDepartments } from "../../../api";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDepartments();

    return () => {};
  }, [page, limit]);

  const fetchDepartments = async () => {
    try {
      let response;
      if (searchTerm) {
        response = await listDepartments(page, limit, searchTerm);
      } else {
        response = await listDepartments(page, limit);
      }
      setDepartments(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.log("Error fetching department list:", error);
    }
  };

  const handleSearchClick = () => {
    fetchDepartments();
  };

  const resetData = () => {
    setSearchTerm("");
    setPage(1);
    if (!searchTerm) {
      fetchDepartments();
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteDepartment(id);
    if (res?.message) {
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.id !== id)
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
                <Col md={6}>
                  <Button variant="secondary" onClick={resetData}>
                    Reset
                  </Button>
                </Col>
                <Col md={6}>
                  <InputGroup>
                    <FormControl
                      placeholder="Enter Department name"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button variant="info" onClick={handleSearchClick}>
                        Search
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table
                responsive
                style={{ textAlign: "center", borderTop: "none" }}
                bordered
              >
                <thead>
                  {departments?.length > 0 && (
                    <tr>
                      <th>#</th>
                      <th>Departments</th>
                      <th>Action</th>
                    </tr>
                  )}
                </thead>

                <tbody>
                  {departments?.length > 0 ? (
                    departments.map((department, index) => (
                      <tr key={department.id}>
                        <td>{index + 1 + (page - 1) * limit}</td>
                        <td>{department.name}</td>
                        <td>
                          <Link
                            to={`/department/edit/${department.id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            <Button variant={"success"}>Edit</Button>
                          </Link>
                          <Button
                            variant={"danger"}
                            onClick={(e) => handleDelete(department.id)}
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

export default DepartmentList;
