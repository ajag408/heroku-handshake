import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Main from "./components/Main.components";

function App() {
  return (
    //<Router>
    <div className="App">
      {/* <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Handshake App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-student"} className="nav-link">
                  Create Student
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-student/:id"} className="nav-link">
                  Edit Student
                </Link>
              </Nav> */}

              {/* <Nav>
                <Link to={"/student-list"} className="nav-link">
                  Student List
                </Link>
              </Nav> */}
            {/* </Nav>

          </Container>
        </Navbar>
      </header> */}

      {/* <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/create-student" component={CreateStudent} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container> */}
       <Navbar />
      <Main />
     </div>
  // </Router> */} */}
  );
}

export default App;