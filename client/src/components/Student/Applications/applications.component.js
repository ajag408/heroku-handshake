
import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../studentNav.component';
import Content from './applicationsContent.component';

export default class Applications extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeStatusFilter = this.onChangeStatusFilter.bind(this);


    // Setting up state
    this.state = {
      applications: [],
      pending: false,
      reviewed: false,
      declined: false,
    };
    axios.get('/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });

    axios.get('/jobs/jobsApplied')
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          console.log("can't load apps");
        } else {
          this.setState({
            applications: res.data,
          });
        }
      });
  }


  onChangeStatusFilter() {
    const filter = [];
    const { pending } = this.state;
    const { reviewed } = this.state;
    const { declined } = this.state;
    const filterObject = {

      Pending: pending,
      Reviewed: reviewed,
      Declined: declined,
    };
    console.log(filterObject);
    // const entries = Object.entries(filterObject);
    Object.keys(filterObject).forEach((key) => {
      if (filterObject[key] === true) {
        console.log(key);
        filter.push(key);
      }
    });

    axios.get('/jobs/jobsApplied')
      .then((response) => {
        //   this.setState({
        //     applications : [],

        //     });
        if (filter.length > 0) {
          const filtered = [];
          for (let i = 0; i < response.data.length; i += 1) {
            if (filter.includes(response.data[i].status)) {
              filtered.push(response.data[i]);
            }
          }
          this.setState({
            applications: filtered,

          });
        } else {
          this.setState({
            applications: response.data,

          });
        }
        const { applications } = this.state;
        console.log(applications);
      });
  }


  render() {
    return (
      <div>
        <Navigator />
        <Content state={this.state} onChangeStatusFilter={this.onChangeStatusFilter} />

      </div>

    );
  }
}
