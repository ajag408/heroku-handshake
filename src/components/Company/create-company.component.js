  
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

export default class CreateCompany extends Component {
  constructor(props) {
    super(props)

        axios.get('http://localhost:4000/companies/user')
    .then(res => {
      console.log(res.data);
      if(res.data.email){
        window.location.href = "/company/";
      }
    });


    // Setting up functions
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
    this.onChangeCompanyPassword = this.onChangeCompanyPassword.bind(this);
    this.onChangeCompanyLoc = this.onChangeCompanyLoc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      password: '',
      loc: ''
    }
  }

  onChangeCompanyName(e) {
    this.setState({name: e.target.value})
  }

  onChangeCompanyEmail (e) {
    this.setState({email: e.target.value})
  }

  onChangeCompanyPassword(e) {
    this.setState({password: e.target.value})
  }

  onChangeCompanyLoc(e) {
    this.setState({loc: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const companyObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      loc: this.state.loc
    };
    axios.post('http://localhost:4000/companies/create-company', companyObject)
    .then(res => {
        if(res.data.name == "MongoError"){
          alert("Unsuccessful signup; make sure email is unique");
        } else {
          alert("Successful signup");
          window.location.href = "/company-signin";
        }
      }
    );
    this.setState({name: '', email: '', password: '', loc: ''})
  }

  render() {
    return (<div className="form-wrapper">

      <h1>Company Sign Up</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" value={this.state.name} onChange={this.onChangeCompanyName}/>
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" value={this.state.email} onChange={this.onChangeCompanyEmail}/>
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" value={this.state.password} onChange={this.onChangeCompanyPassword}/>
        </Form.Group>

        <Form.Group controlId="Loc">
          <Form.Label>Location</Form.Label>
          <Form.Control required type="text" value={this.state.loc} onChange={this.onChangeCompanyLoc}/>
        </Form.Group>


        <Button variant="danger" size="lg" block="block" type="submit">
          Create Company
        </Button>
        <br></br>
        <Grid container justify="flex-end">
            <Grid item>
              <Link href="/company-signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </Form>
    </div>);
  }
}