  
import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Navigator from './companyNav.component';
import Content from '../content.component';

export default class CompanyJobPosting extends Component {
  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
    this.onChangeStudentCollegeName = this.onChangeStudentCollegeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      password: '',
      collegeName: ''
    }
  }

  onChangeStudentName(e) {
    this.setState({name: e.target.value})
  }

  onChangeStudentEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeStudentPassword(e) {
    this.setState({password: e.target.value})
  }

  onChangeStudentCollegeName(e) {
    this.setState({collegeName: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const studentObject = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      collegeName: this.state.collegeName
    };
    axios.post('http://localhost:4000/students/create-student', studentObject)
      .then(res => {
          if(res.data.name == "MongoError"){
            alert("Unsuccessful signup; make sure email is unique");
          } else {
            alert("Successful signup");
            window.location.href = "/student-signin";
          }
        }
      );
    this.setState({name: '', email: '', password: '', collegeName: ''})
  
}

// var styles = theme => ({
//   paper: {
//     maxWidth: 936,
//     margin: 'auto',
//     overflow: 'hidden',
//   },
//   block: {
//     display: 'block',
//   },
//   contentWrapper: {
//     margin: '40px 16px',
//   }

  render() {



    return (<div><Navigator/>
  <Content>
          {/* <form  ref = {this.form} onSubmit = {e => e.preventDefault()}>
                        <div style={{width: '30%'}} class="form-group">
                            <input  required onChange = {this.bookidChangeHandler} type="number" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input required onChange = {this.titleChangeHandler} type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input required onChange = {this.authorChangeHandler} type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate}class="btn btn-success" type="submit">Create</button>
                        </div> 
              </form> */}

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
      </Content>
    </div>
  
    );
  }
}