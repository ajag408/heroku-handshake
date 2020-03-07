
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';


export default class CompanySignin extends Component {
  constructor(props) {
    axios.get('/companies/user')
      .then((res) => {
        console.log(res.data);
        if (res.data.isCompany) {
          window.location.href = '/company/landing';
        }
      });

    super(props);


    // Setting up functions
    this.onChangeCompanyEmail = this.onChangeCompanyEmail.bind(this);
    this.onChangeCompanyPassword = this.onChangeCompanyPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email: '',
      password: '',
    };
  }

  // componentWillMount(){
  //   axios.get('/companies/user')
  //     .then(res => {
  //       console.log(res.data);
  //       if(res.data.email){
  //         window.location.href = "/company/";
  //       }
  //     });
  // }
  onChangeCompanyEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeCompanyPassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const companyObject = {
      email,
      password,
    };
    // axios.defaults.withCredentials = true;

    axios.post('/companies/login', companyObject)
      .then((res) => {
        if (res.data.isCompany) {
          window.location.href = '/company/landing';
        } else {
          alert(res.data);
        }
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>

        <div className="form-wrapper">

          <h1>Company Sign In</h1>
          <Form onSubmit={this.onSubmit}>

            <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" value={email} onChange={this.onChangeCompanyEmail} />
            </Form.Group>

            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" value={password} onChange={this.onChangeCompanyPassword} />
            </Form.Group>

            <Button variant="danger" size="lg" block="block" type="submit">
              Sign In
            </Button>
            <br />
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup-company" variant="body2">
                  Don&apos;t have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Form>
        </div>
      </div>
    );
  }
}
