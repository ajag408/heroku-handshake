  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './viewEventsContent.component';
import { connect } from "react-redux";

export default class ViewEvents extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);

    this.onRegister = this.onRegister.bind(this);


    // Setting up state
    this.state = {
      search: '',
      events: [],
    }
    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.isStudent){
        window.location.href = "/student-signin";
      } 
    });
    axios.get('http://localhost:4000/students/get-upcoming-events')
    .then(res => {
        console.log(res.data);
        if(res.data.errno){
          console.log("can't load events");
         } else {
          this.setState({
              events: res.data,
          });
         }
      });


  }



  onChangeSearchInput(e) {
    this.setState({search: e.target.value}, () =>{
        console.log(this.state.search);
        if(this.state.search.length > 0){
            const searchObject = {
              search : this.state.search,
           };
           axios.post('http://localhost:4000/students/search-upcoming-events', searchObject)
           .then((response) => {
           //update the state with the response data
            console.log(response.data);
         
           this.setState({
               events : response.data,
               
           });
               console.log(this.state.students);
            });
        } else {
            axios.get('http://localhost:4000/students/get-upcoming-events')
            .then(res => {
                console.log(res.data);
                if(res.data.errno){
                  console.log("can't load events");
                 } else {
                  this.setState({
                      events: res.data,
                  });
                 }
              });
        }


    } );
     
  }

  onRegister(e) {

     
  }
    // } else {


  render() {



    return (  <div>
    <Navigator/>
    <Content state = {this.state}  onChangeSearchInput = {this.onChangeSearchInput}
    onRegister = {this.onRegister}
    />

        </div> 
  
    );        
  }
}
