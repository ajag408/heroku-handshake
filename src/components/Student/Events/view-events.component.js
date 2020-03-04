
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Navigator from '../studentNav.component';
import Content from './viewEventsContent.component';

export default class ViewEvents extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);

    this.onRegister = this.onRegister.bind(this);


    // Setting up state
    this.state = {
      search: '',
      events: [],
      registered: [],
      education: [],
      regMatch: false,
    };
    axios.get('http://localhost:4000/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });

    axios.get('http://localhost:4000/events/get-registered-events')
      .then((res) => {
        if (res.data.errno) {
          console.log(res.data);
        } else {
          this.setState({
            registered: res.data,
          });
        }
      });

    axios.get('http://localhost:4000/students/education')
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          alert(res.data);
        } else {
          this.setState({
            education: res.data,
          });
          console.log(this.state.education);
        }
      });
    axios.get('http://localhost:4000/events/get-upcoming-events')
      .then((res) => {
        console.log(res.data);
        if (res.data.errno) {
          console.log("can't load events");
        } else {
          this.setState({
            events: res.data,
          });
        }
      });
  }


  onChangeSearchInput(e) {
    this.setState({ search: e.target.value }, () => {
      console.log(this.state.search);
      if (this.state.search.length > 0) {
        const searchObject = {
          search: this.state.search,
        };
        axios.post('http://localhost:4000/events/search-upcoming-events', searchObject)
          .then((response) => {
            // update the state with the response data
            console.log(response.data);

            this.setState({
              events: response.data,

            });
            console.log(this.state.students);
          });
      } else {
        axios.get('http://localhost:4000/events/get-upcoming-events')
          .then((res) => {
            console.log(res.data);
            if (res.data.errno) {
              console.log("can't load events");
            } else {
              this.setState({
                events: res.data,
              });
            }
          });
      }
    });
  }

  onRegister(e) {
    console.log(e.target.id);
    const eventObject = {
      id: e.target.id,
    };

    // console.log(document.getElementById(1).id)
    axios.post('http://localhost:4000/events/get-event', eventObject)
      .then((res) => {
        console.log(res.data[0].eligibility);
        if (res.data.errno) {
          alert('Unsuccessful update');
        } else {
          if (res.data[0].eligibility == 'All') {
            this.setState({
              regMatch: true,
            });
            console.log(this.state.regMatch);
          } else {
            for (let i = 0; i < this.state.education.length; i++) {
              console.log(this.state.education[i].major);
              if (res.data[0].eligibility == this.state.education[i].major) {
                console.log('yee');
                this.setState({
                  regMatch: true,
                });
              }
            }
          }
          if (!this.state.regMatch) {
            alert('You are not eligible to register for this event, based on your educational background');
          } else {
            console.log('in final else');
            console.log(res.data[0].id);
            const regObject = {
              event: res.data[0].id,
            };
            axios.post('http://localhost:4000/events/registerEvent', regObject)
              .then((res) => {
                if (res.data.errno) {
                  alert('You already registered for this event');
                } else {
                  alert('Successful registration');
                }
              });
          }
        }
      });

    //   console.log(this.state.regMatch);
  }
  // } else {


  render() {
    return (
      <div>
        <Navigator />
        <Content
          state={this.state}
          onChangeSearchInput={this.onChangeSearchInput}
          onRegister={this.onRegister}
        />

      </div>

    );
  }
}
