  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './applicationsContent.component';
import { connect } from "react-redux";

export default class Applications extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeStatusFilter = this.onChangeStatusFilter.bind(this);


    // Setting up state
    this.state = {
      applications: [],
      pending: false,
      reviewed: false,
      declined: false
    }
    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.isStudent){
        window.location.href = "/student-signin";
      }
    });

    axios.get('http://localhost:4000/students/jobsApplied')
    .then(res => {
      console.log(res.data);
      if(res.data.errno){
        console.log("can't load apps");
       } else {
        this.setState({
            applications: res.data,
        });
       }
    });

  }

   

  onChangeStatusFilter(e) {  
        var filter = [];
        const filterObject = {
          "Pending" : this.state.pending,
          "Reviewed": this.state.reviewed,
          "Declined" : this.state.declined
       };
       console.log(filterObject);
       for( const filterName in filterObject){
         if(filterObject[filterName] == true){
           console.log(filterName);
           filter.push(filterName);
         }
       }
   
         axios.get('http://localhost:4000/students/jobsApplied')
         .then((response) => {
            //   this.setState({
            //     applications : [],
                
            //     });
              if(filter.length>0){
                var filtered = [];
                for(var i =0;i<response.data.length; i++){
                  if(filter.includes(response.data[i].status)){
                    filtered.push(response.data[i]);
                  }
                }
                this.setState({
                  applications : filtered,
                  
                  });
              }
              else {
                 this.setState({
                  applications : response.data,
                  
                   });
              }
              console.log(this.state.applications);
           });
      }
    


  render() {



    return (  <div>
    <Navigator/>
    <Content state = {this.state}  onChangeStatusFilter = {this.onChangeStatusFilter}/>

        </div> 
  
    );        
  }
}
