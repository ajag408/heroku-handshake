import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigator from '../studentNav.component';
import Content from './viewProfContent.component';


export default class ViewStudentProfileFromStudent extends Component {
  constructor(props) {
    super(props);


    // Setting up state
    this.state = {
      student: [],
      education: [],
      experience: [],
    };

    axios.get('http://localhost:4000/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });
  }

  componentDidMount() {
    const { match: { params } } = this.props;

    axios.get(`http://localhost:4000/students/getStudent/${params.id}`)
      .then(({ data: user }) => {
        console.log('user', user);

        this.setState({ student: user });
      });

    axios.get(`http://localhost:4000/students/educationBlind/${params.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          alert(res.data);
        } else {
          this.setState({
            education: res.data,
          });
        }
      });

    axios.get(`http://localhost:4000/students/experienceBlind/${params.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          alert(res.data);
        } else {
          this.setState({
            experience: res.data,
          });
        }
      });
  }


  render() {
    return (
      <div>
        <Navigator />
        <Content state={this.state} />

      </div>

    );
  }
}

ViewStudentProfileFromStudent.propTypes = {
  match: PropTypes.node.isRequired,

};
