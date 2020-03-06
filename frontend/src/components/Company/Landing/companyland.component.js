/* eslint no-restricted-syntax: "off", guard-for-in: "off",
no-await-in-loop: "off", "no-loop-func": "off",
react/destructuring-assignment: "off",
react/no-access-state-in-setstate: "off" */
import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../companyNav.component';
import Content from './jobPostContent.component';


export default class CompanyJobPosting extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeCreated = this.onChangeCreated.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeJobLoc = this.onChangeJobLoc.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeJobDescription = this.onChangeJobDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeApplicationStatus = this.onChangeApplicationStatus.bind(this);

    // Setting up state
    this.state = {
      title: '',
      created: '',
      deadline: '',
      loc: '',
      salary: '',
      description: '',
      cat: 'Full Time',
      jobs: [],
      loaded: false,
      companyName: '',
    };
    axios.get('http://localhost:4000/companies/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isCompany) {
          console.log(res.data.isCompany);
          window.location.href = '/company-signin';
        } else {
          this.setState({
            companyName: res.data.user.name,

          });
          // console.log(this.state.companyName);
        }
      });


    axios.get('http://localhost:4000/jobs/get-jobs')
      .then((response) => {
        (async () => {
          for (const job in response.data) {
            await axios.post('http://localhost:4000/applications/get-applicants', response.data[job])
              .then((res) => {
                response.data[job].applicants = res.data;
              })
              .then(() => {
                this.setState({
                  jobs: this.state.jobs.concat(response.data[job]),
                });
              });
          }

          console.log(this.state.jobs);
        })();
        console.log(this.state.jobs);
      });
  }


  onChangeJobTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeCreated(e) {
    this.setState({ created: e.target.value });
  }

  onChangeDeadline(e) {
    this.setState({ deadline: e.target.value });
  }

  onChangeJobLoc(e) {
    this.setState({ loc: e.target.value });
  }

  onChangeSalary(e) {
    this.setState({ salary: e.target.value });
  }

  onChangeJobDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeCategory(e) {
    this.setState({ cat: e.target.value });
  }

  onChangeApplicationStatus(e) {
    console.log(this);
    console.log(e.target.id);
    console.log(e.target.value);
    const applicationObject = {
      id: e.target.id,
      status: e.target.value,
    };
    // console.log(document.getElementById(1).id)
    axios.post('http://localhost:4000/applications/updateApplication', applicationObject)
      .then((res) => {
        if (res.data.errno) {
          alert('Unsuccessful update');
        } else {
          alert('Successfully updated');
          window.location.href = '/company/landing';
        }
      });
  }


  onSubmit(e) {
    e.preventDefault();

    const jobObject = {
      title: this.state.title,
      created: this.state.created,
      deadline: this.state.deadline,
      loc: this.state.loc,
      salary: this.state.salary,
      description: this.state.description,
      cat: this.state.cat,
    };

    axios.post('http://localhost:4000/jobs/create-job', jobObject)
      .then((res) => {
        if (res.data.errno) {
          alert('Unsuccessful add');
        } else {
          alert('Successfully added new job');
          window.location.href = '/company/landing';
        }
      });
  }


  render() {
  //   if (!this.state.loaded) {
    //     return <div />
    // }

    return (
      <div>
        <Navigator />
        <Content
          onSubmit={this.onSubmit}
          state={this.state}
          onChangeCreated={this.onChangeCreated}
          onChangeJobTitle={this.onChangeJobTitle}
          onChangeDeadline={this.onChangeDeadline}
          onChangeJobLoc={this.onChangeJobLoc}
          onChangeSalary={this.onChangeSalary}
          onChangeJobDescription={this.onChangeJobDescription}
          onChangeCategory={this.onChangeCategory}
          onChangeApplicationStatus={this.onChangeApplicationStatus}
        />

      </div>

    );
  }
}
