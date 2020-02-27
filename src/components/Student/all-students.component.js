  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './studentSearchContent.component';


export default class StudentSearch extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeSearch = this.onChangeSearch.bind(this);

    // Setting up state
    this.state = {
      search: '',
      students: []  
    }
    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.isStudent){
        window.location.href = "/studnet-signin";
      }
    });
  }

  onChangeSearch(e) {
    this.setState({search: e.target.value}, () =>{
        console.log(this.state.search);
        if(this.state.search.length > 0){
            const searchObject = {
              search : this.state.search,
           };
           axios.post('http://localhost:4000/students/search', searchObject)
           .then((response) => {
           //update the state with the response data
            console.log(response.data);
         
           this.setState({
               students : response.data,
               
           });
               console.log(this.state.students);
            });
        } else {
          this.setState({
            students : [],
            
        });
        }


    } );
    
  }

  render() {



    return (  <div>
    <Navigator/>
    <Content onSubmit = {this.onSubmit} state = {this.state} 
    onChangeSearch= {this.onChangeSearch} />

        </div> 
  
    );        
  }
}
