/* eslint no-restricted-syntax: "off", guard-for-in: "off",
no-await-in-loop: "off", "no-loop-func": "off",
react/destructuring-assignment: "off",
react/no-access-state-in-setstate: "off" */
import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../companyNav.component';
import Content from './createEventContent.component';


export default class MakeEvents extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeEventName = this.onChangeEventName.bind(this);
    this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeEventLoc = this.onChangeEventLoc.bind(this);
    this.onChangeEligibility = this.onChangeEligibility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      time: '',
      loc: '',
      eligibility: '',
      description: '',
      events: [],
      companyName: '',
      date: '',
    };
    axios.get('http://localhost:4000/companies/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isCompany) {
          window.location.href = '/company-signin';
        } else {
          this.setState({
            companyName: res.data.user.name,

          });
          // console.log(this.state.companyName);
        }
      });
  }

  // get the jobs data from backend
  componentDidMount() {
    axios.get('http://localhost:4000/events/get-events')
      .then((response) => {
        (async () => {
          for (const event in response.data) {
            await axios.post('http://localhost:4000/events/get-registered-students', response.data[event])
              .then((res) => {
                response.data[event].students = res.data;
              })
              .then(() => {
                this.setState({
                  events: this.state.events.concat(response.data[event]),
                });
              });
          }
          // this.setState({
          //     jobs : this.state.jobs.concat(response.data),

          // });
          // console.log(this.state.events);
        })();
        // console.log(this.state.events);
      });
  }

  onChangeEventName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEventDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeTime(e) {
    this.setState({ time: e.target.value });
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }


  onChangeEventLoc(e) {
    this.setState({ loc: e.target.value });
  }

  onChangeEligibility(e) {
    console.log(e.target.value);
    this.setState({ eligibility: e.target.value });
  }


  onChangeCategory(e) {
    this.setState({ cat: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();
    const {
      name, description, time, date, loc, eligibility,
    } = this.state;
    const eventObject = {
      name,
      description,
      time,
      date,
      loc,
      eligibility,
    };

    axios.post('http://localhost:4000/events/create-event', eventObject)
      .then((res) => {
        if (res.data.errno) {
          alert('Unsuccessful add');
        } else {
          alert('Successfully added new event');
          window.location.href = '/company/events';
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
          onChangeTime={this.onChangeTime}
          onChangeDate={this.onChangeDate}
          onChangeEventName={this.onChangeEventName}
          onChangeEventLoc={this.onChangeEventLoc}
          onChangeEligibility={this.onChangeEligibility}
          onChangeEventDescription={this.onChangeEventDescription}
        />

      </div>

    );
  }
}
