  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from '../../Student/studentNav.component';
import Content from './viewProfContent.component';


export default class ViewCompanyProfile extends Component {
  constructor(props) {
    super(props)





    // Setting up state
    this.state = {
      company: [],
    }

    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.isStudent){
        window.location.href = "/student-signin";
      }
    });

  }
  componentDidMount() {
    const { match: { params } } = this.props;
  
    axios.get(`http://localhost:4000/companies/getCompany/${params.id}`)
      .then(({ data: user }) => {
        console.log('user', user);
  
        this.setState({ company: user });
      });


  }


  render() {



    return (  <div>
    <Navigator/>
    <Content state = {this.state} />

        </div> 
  
    );        
  }
}
