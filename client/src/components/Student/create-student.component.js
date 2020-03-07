
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { addStudent } from '../../js/actions/index';

class CreateStudents extends Component {
  constructor(props) {
    super(props);

    axios.get('http://localhost:4000/companies/user')
      .then((res) => {
        console.log(res.data);
        if (res.data.isCompany) {
          window.location.href = '/company/landing';
        }
      });
    axios.get('http://localhost:4000/students/user')
      .then((res) => {
        console.log(res.data);
        if (res.data.isStudent) {
          window.location.href = '/student/landing';
        }
      });
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
      collegeName: '',
    };
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeStudentPassword(e) {
    this.setState({ password: e.target.value });
  }

  onChangeStudentCollegeName(e) {
    this.setState({ collegeName: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      name, email, password, collegeName,
    } = this.state;
    const {
      addStudent: add,
    } = this.props;
    const studentObject = {
      name,
      email,
      password,
      collegeName,
    };
    add(studentObject);
    // axios.post('http://localhost:4000/students/create-student', studentObject)
    //   .then(res => {
    //       if(res.data.errno){
    //         alert("Unsuccessful signup; make sure email is unique");
    //       } else {
    //         alert("Successful signup");
    //         window.location.href = "/student-signin";
    //       }
    //     }
    //   );
    this.setState({
      name: '', email: '', password: '', collegeName: '',
    });
  }

  render() {
    const {
      name, email, password, collegeName,
    } = this.state;
    return (
      <div className="form-wrapper">
        <h1>Student Sign Up</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" value={name} onChange={this.onChangeStudentName} />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" value={email} onChange={this.onChangeStudentEmail} />
          </Form.Group>

          <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" value={password} onChange={this.onChangeStudentPassword} />
          </Form.Group>

          <Form.Group controlId="CollegeName">
            <Form.Label>College Name</Form.Label>
            <Form.Control required type="text" value={collegeName} onChange={this.onChangeStudentCollegeName} />
          </Form.Group>


          <Button variant="danger" size="lg" block="block" type="submit">
            Create Student
          </Button>
          <br />
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/student-signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
    );
  }
}
CreateStudents.propTypes = {
  addStudent: PropTypes.func.isRequired,

};
function mapDispatchToProps(dispatch) {
  return {
    addStudent: (student) => dispatch(addStudent(student)),
  };
}
const CreateStudent = connect(null, mapDispatchToProps)(CreateStudents);
export default CreateStudent;
