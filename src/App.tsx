import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import Form from "react-bootstrap/Form";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fuse from "fuse.js";
import { Table } from "react-bootstrap";
import { items } from "../src/data";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>();

  const search = (query: string) => {
    const fuse = new Fuse(Object.values(items), {
      includeScore: true,
      ignoreLocation: true,
    });
    return fuse.search(query);
  };

  useEffect(() => {
    setSearchResults(search(searchTerm));
  }, [searchTerm]);

  return (
    <Container className="App">
      <Row>
        <Col sm={4}></Col>
        <Col>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <br></br>
          <Form.Control
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {searchResults?.map((result) => {
                return (
                  <tr>
                    <th>{result.item}</th>
                    <th>{Math.floor(result.score * 100)}</th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
