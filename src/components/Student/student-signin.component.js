  
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

export default class StudentSignin extends Component {
  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: '',
      password: '',
    }
  }

  onChangeStudentEmail (e) {
    this.setState({email: e.target.value})
  }

  onChangeStudentPassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('http://localhost:4000/students/login', studentObject)
    .then(res => {
        if(res.data.email){
          window.location.href = "/";
        } else {
          alert(res.data);
        }
      }
    );
  }

  render() {
    return (<div className="form-wrapper">

      <h1>Student Sign In</h1>
      <Form onSubmit={this.onSubmit}>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={this.state.email} onChange={this.onChangeStudentEmail}/>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" value={this.state.password} onChange={this.onChangeStudentPassword}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Sign In
        </Button>
        <br></br>
        <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup-student" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
      </Form>
    </div>);
  }
}