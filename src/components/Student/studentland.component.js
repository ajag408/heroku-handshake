  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './jobPostContent.component';


export default class JobSearch extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeJobLoc= this.onChangeJobLoc.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      search: '',
      loc: '',
      cat: '',
      jobs: [],
      studentName: ''
    }
    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.email){
        window.location.href = "/student-signin";
      } else {
        this.setState({
          studentName : res.data.name
          
          });
          console.log(this.state.studentName);
      }
    });
  }

    // get the jobs data from backend  
//     componentDidMount(){
//       axios.get('http://localhost:4000/companies/get-jobs')
//               .then((response) => {
//               //update the state with the response data

            
//               this.setState({
//                   jobs : this.state.jobs.concat(response.data)
                  
//               });
//               console.log(this.state.jobs);
//           });
//   }


  onChangeJobLoc(e) {
    this.setState({loc: e.target.value})
  }

  onChangeCategory(e) {
    this.setState({cat: e.target.value})
  }

  onChangeSearch(e) {
    this.setState({search: e.target.value}, () =>{
        console.log(this.state.search);
        const searchObject = {
            search : this.state.search,
        };
        axios.post('http://localhost:4000/students/search', searchObject)
        .then((response) => {
        //update the state with the response data

      
        this.setState({
            jobs : response.data,
            
        });
            console.log(this.state.jobs);
         });
    } );
    
  }


  render() {



    return (  <div>
    <Navigator/>
    <Content state = {this.state}  onChangeSearch = {this.onChangeSearch}
     onChangeJobLoc = {this.onChangeJobLoc}
    onChangeCategory = {this.onChangeCategory} />

        </div> 
  
    );        
  }
}
