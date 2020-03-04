
import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../studentNav.component';
import Content from './studentSearchContent.component';


export default class StudentSearch extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);

    // Setting up state
    this.state = {
      search: '',
      students: [],
      allStudents: [],
      major: '',
    };
    axios.get('http://localhost:4000/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });
    axios.get('http://localhost:4000/students/get-all-students')
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          console.log(res.data);
        } else {
          this.setState({
            allStudents: res.data,

          });
        }
      });
  }

  onChangeSearch(e) {
    this.setState({ search: e.target.value }, () => {
      console.log(this.state.search);
      if (this.state.search.length > 0) {
        const searchObject = {
          search: this.state.search,
        };
        axios.post('http://localhost:4000/students/search', searchObject)
          .then((response) => {
            // update the state with the response data
            console.log(response.data);

            this.setState({
              students: response.data,

            });
            console.log(this.state.students);
          });
      } else {
        this.setState({
          students: [],

        });
      }
    });
  }

  onChangeMajor(e) {
    this.setState({ major: e.target.value }, () => {
      console.log(this.state.major);
      if (this.state.search.length > 0) {
        const searchObject = {
          search: this.state.search,
          major: this.state.major,
        };

        axios.post('http://localhost:4000/students/filterMajor', searchObject)
          .then((response) => {
            console.log(response.data);

            this.setState({
              students: response.data,

            });
            console.log(this.state.students);
          });
      } else {
        this.setState({
          jobs: [],

        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navigator />
        <Content
          onSubmit={this.onSubmit}
          state={this.state}
          onChangeSearch={this.onChangeSearch}
          onChangeMajor={this.onChangeMajor}
        />

      </div>

    );
  }
}
