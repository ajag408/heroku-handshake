
import React, { Component } from 'react';
import axios from 'axios';
import Navigator from '../studentNav.component';
import Content from './jobSearchContent.component';

export default class JobSearch extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onChangeSearchFilter = this.onChangeSearchFilter.bind(this);
    this.onChangeSearchLoc = this.onChangeSearchLoc.bind(this);
    this.onUpload = this.onUpload.bind(this);


    // Setting up state
    this.state = {
      search: '',
      loc: '',
      cat: '',
      jobs: [],
      studentName: '',
      selectedFT: false,
      selectedPT: false,
      selectedON: false,
      selectedIN: false,
    };
    axios.get('http://localhost:4000/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        } else {
          this.setState({
            studentName: res.data.user.name,

          });
          // console.log(this.state.studentName);
        }
      });
  }


  onChangeSearchInput(e) {
    // if(e.target.value.length>0){
    console.log('etargetval');
    console.log(e.target.value);
    this.setState({ search: e.target.value }, () => {
      // console.log(this.state.search);
      const {
        search, selectedFT, selectedPT, selectedON, selectedIN, loc,
        jobs,
      } = this.state;
      if (search.length > 0) {
        const filter = [];
        const filterObject = {
          'Full Time': selectedFT,
          'Part Time': selectedPT,
          'On Campus': selectedON,
          Intern: selectedIN,
        };
        Object.keys(filterObject).forEach((key) => {
          if (filterObject[key] === true) {
            filter.push(key);
          }
        });
        const searchObject = {
          search,
          loc,
        };

        axios.post('http://localhost:4000/jobs/searchJobs', searchObject)
          .then((response) => {
            if (filter.length > 0) {
              for (let i = 0; i < response.data.length; i += 1) {
                if (filter.includes(response.data[i].cat)) {
                  jobs.push(response.data[i]);
                }
              }
            } else {
              this.setState({
                jobs: response.data,

              });
            }
            // console.log(this.state.jobs);
          });
      } else {
        this.setState({
          jobs: [],

        });
      }
    });
  }
  // } else {

  onChangeSearchFilter() {
    const {
      search, selectedFT, selectedPT, selectedON, selectedIN, loc,
    } = this.state;
    if (search.length > 0) {
      const filter = [];
      const filterObject = {
        'Full Time': selectedFT,
        'Part Time': selectedPT,
        'On Campus': selectedON,
        Intern: selectedIN,
      };
      console.log(filterObject);
      Object.keys(filterObject).forEach((key) => {
        if (filterObject[key] === true) {
          console.log(key);
          filter.push(key);
        }
      });
      const searchObject = {
        search,
        loc,
      };

      axios.post('http://localhost:4000/jobs/searchJobs', searchObject)
        .then((response) => {
          this.setState({
            jobs: [],

          });
          if (filter.length > 0) {
            const filtered = [];
            for (let i = 0; i < response.data.length; i += 1) {
              if (filter.includes(response.data[i].cat)) {
                filtered.push(response.data[i]);
              }
            }
            this.setState({
              jobs: filtered,

            });
          } else {
            this.setState({
              jobs: response.data,

            });
          }
          // console.log(this.state.jobs);
        });
    } else {
      this.setState({
        jobs: [],

      });
    }
  }

  onChangeSearchLoc(e) {
    this.setState({ loc: e.target.value }, () => {
      const {
        search, selectedFT, selectedPT, selectedON, selectedIN, loc, jobs,
      } = this.state;
      if (search.length > 0) {
        const filter = [];
        const filterObject = {
          'Full Time': selectedFT,
          'Part Time': selectedPT,
          'On Campus': selectedON,
          Intern: selectedIN,
        };
        Object.keys(filterObject).forEach((key) => {
          if (filterObject[key] === true) {
            filter.push(key);
          }
        });
        const searchObject = {
          search,
          loc,
        };

        axios.post('http://localhost:4000/jobs/searchJobs', searchObject)
          .then((response) => {
            if (filter.length > 0) {
              for (let i = 0; i < response.data.length; i += 1) {
                if (filter.includes(response.data[i].cat)) {
                  jobs.push(response.data[i]);
                }
              }
            } else {
              this.setState({
                jobs: response.data,

              });
            }
            // console.log(this.state.jobs);
          });
      } else {
        this.setState({
          jobs: [],

        });
      }
    });
  }

  onUpload(e) {
    console.log(this);
    console.log(e.target.value);
    // console.log(e._dispatchListeners);
    e.preventDefault();
    const { files } = document.getElementById('INPUT_TAG');
    console.log(files.length);
    if (files.length === 0) {
      alert('Please upload a resume to submit your application');
    } else {
      const formData = new FormData();
      // files[0].jobID = e.target.value;
      formData.append('resume', files[0]);
      // console.log(e.target.value);
      // formData.append('jobID', e.target.value);
      const applyObject = {
        id: e.target.value,
      };
      console.log(applyObject);
      axios.post('http://localhost:4000/applications/jobApply', applyObject);
      // console.log(formData.getAll('resume'));
      axios.post('http://localhost:4000/applications/resume', formData)
        .then((res) => {
          if (res.data.errno) {
            alert('Unsuccessful update');
          } else {
            alert(res.data);
            // window.location.href = "/student/profile";
          }
        });
      console.log(files[0]);
      // alert("succussful upload");
    }
  }


  render() {
    return (
      <div>
        <Navigator />
        <Content
          state={this.state}
          onChangeSearchInput={this.onChangeSearchInput}
          onChangeSearchFilter={this.onChangeSearchFilter}
          onChangeSearchLoc={this.onChangeSearchLoc}
          onUpload={this.onUpload}
        />

      </div>

    );
  }
}
