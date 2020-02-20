  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './companyNav.component';
import Content from './createEventContent.component';


export default class MakeEvents extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeEventName = this.onChangeEventName.bind(this);
    this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeEventLoc= this.onChangeEventLoc.bind(this);
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
      date: ''
    }
    axios.get('http://localhost:4000/companies/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.email){
        window.location.href = "/company-signin";
      } else {
        this.setState({
          companyName : res.data.name
          
          });
          console.log(this.state.companyName);
      }
    });

  }

    // get the jobs data from backend  
    componentDidMount(){
      axios.get('http://localhost:4000/companies/get-events')
              .then((response) => {
              //update the state with the response data

            
              this.setState({
                  events : this.state.events.concat(response.data)
                  
              });
              console.log(this.state.events);
          });
  }

  onChangeEventName(e) {
    this.setState({name: e.target.value})
  }

  onChangeEventDescription(e) {
    this.setState({description: e.target.value})
  }

  onChangeTime(e) {
    this.setState({time: e.target.value})
  }
  onChangeDate(e) {
    this.setState({date: e.target.value})
  }


  onChangeEventLoc(e) {
    this.setState({loc: e.target.value})
  }

  onChangeEligibility(e) {
      console.log(e.target.value);
    this.setState({eligibility: e.target.value})
  }


  onChangeCategory(e) {
    this.setState({cat: e.target.value})
    
  }


  onSubmit(e) {

    e.preventDefault()

    const eventObject = {
      name: this.state.name,
      description: this.state.description,
      time: this.state.time,
      date: this.state.date,
      loc: this.state.loc,
      eligibility: this.state.eligibility,
    };

    axios.post('http://localhost:4000/companies/create-event', eventObject)
      .then(res => {
          if(res.data.name == "MongoError"){
            alert("Unsuccessful add");
          } else {
            alert("Successfully added new event");
            window.location.href = "/company/events";
          }
        }     
      );
    // this.setState({name: '', Time: '', deadline: '', loc: '', Eligibility: '', description: '', cat: ''})
    
}


  render() {



    return (  <div>
    <Navigator/>
    <Content onSubmit = {this.onSubmit} state = {this.state} onChangeTime = {this.onChangeTime} 
    onChangeDate = {this.onChangeDate} onChangeEventName = {this.onChangeEventName}
    onChangeEventLoc = {this.onChangeEventLoc} onChangeEligibility = {this.onChangeEligibility}
      onChangeEligibility = {this. onChangeEligibility} onChangeEventDescription = {this.onChangeEventDescription}
    />

        </div> 
  
    );        
  }
}
