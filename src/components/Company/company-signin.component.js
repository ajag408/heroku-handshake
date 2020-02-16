  
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';

export default class CompanySignin extends Component {
  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
    this.onChangeCompanyPassword = this.onChangeCompanyPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: '',
      password: ''
    }
  }

  onChangeCompanyEmail (e) {
    this.setState({email: e.target.value})
  }

  onChangeCompanyPassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const companyObject = {
      email: this.state.email,
      password: this.state.password,
    };
    // axios.defaults.withCredentials = true;

    axios.post('http://localhost:4000/companies/login', companyObject)
    .then(res => {
        if(res.data.email){
          window.location.href = "/company/";
        } else {
          alert(res.data);
        }
      }
    );
  }
  // let redirectVar = null;
  // if(cookie.load('cookie')){
  //     console.log("hello");
  //     redirectVar = <Redirect to= "/company/"/>
  // }
  render() {
    let redirectVar = null;
    console.log(cookie);
    if(cookie.load('cookie')){
        console.log("hello");
        redirectVar = <Redirect to= "/company/"/>
    }
    return (
    <div>
      {redirectVar}
    <div className="form-wrapper">
     
      <h1>Company Sign In</h1>
      <Form onSubmit={this.onSubmit}>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={this.state.email} onChange={this.onChangeCompanyEmail}/>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" value={this.state.password} onChange={this.onChangeCompanyPassword}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Sign In
        </Button>
        <br></br>
        <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup-company" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
      </Form>
    </div></div>);
  }
}