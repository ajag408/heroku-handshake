import React from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';


import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateStudent from "./components/signup-student.component";
import CreateCompany from "./components/signup-company.component";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Handshake App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/signup-student"} className="nav-link">
                  Create Student
                </Link>
              </Nav>

              <Nav>
                <Link to={"/signup-company"} className="nav-link">
                  Create Company
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/student-list"} className="nav-link">
                  Student List
                </Link>
              </Nav> */}
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateStudent} />
                <Route path="/signup-student" component={CreateStudent} />
                <Route path="/signup-company" component={CreateCompany} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
