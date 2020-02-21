  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './jobSearchContent.component';


export default class JobSearch extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeJobLoc= this.onChangeJobLoc.bind(this);

    // Setting up state
    this.state = {
      search: '',
      loc: '',
      cat: '',
      jobs: [],
      studentName: '',
      selectedFT: false
      
    }
    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.isStudent){
        window.location.href = "/student-signin";
      } else {
        this.setState({
          studentName : res.data.user.name
          
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

  onChangeFT(e) {
    console.log("hello");
    this.setState({selectedFT: !(this.state.selectedFT)}, () => {
      console.log(this.state.selectedFT);
    })
    
  }



  onChangeSearch(e) {
    var jobArr;
    this.setState({search: e.target.value}, () =>{
        console.log(this.state.search);
        if(this.state.search.length > 0){
            const searchObject = {
              search : this.state.search,
           };
     
           axios.post('http://localhost:4000/students/searchJobs', searchObject)
           .then((response) => {
           //update the state with the response data
              (async () => {
                for(var i = 0; i<response.data.length; i++){
                  var thisCompany = response.data[i].company;
                  console.log("companies in for loop");
                  console.log(thisCompany);
                  const companyObject = {
                    company: thisCompany
                  };
                  // console.log("company object");
 
                  var saveMe = response.data[i];
                  console.log("save me before axios");
                  console.log(saveMe)
                  await axios.post('http://localhost:4000/students/jobCompany', companyObject)
                  .then((res) => {
                    console.log("saveMe in axios");
                    console.log(saveMe);
                    saveMe.companyName = res.data.name;
                    // console.log(res.data);
                  })
                  .then(() => {
                  response.data[i] = saveMe;
                  console.log("data that should be added")
                  console.log(response.data[i])})
                }
                jobArr = response.data;
                console.log("job arr after")
                console.log(jobArr)
               
                  this.setState({
                    jobs : jobArr
                    
                  });
                    console.log("jobs at end");
                    console.log(this.state.jobs);
    
                  
              })();
            })
          //   .then((response)=>{
             
          // })
            // .then(() => {
            //   this.setState({
            //     jobs : [{title: "hello"}],
                
            //   });
            //     console.log("jobs at end");
            //     console.log(this.state.jobs);

            //   })
  
        } else {
          this.setState({
           jobs : [],
            
        });
        }


    } );
    
  }



  render() {



    return (  <div>
    <Navigator/>
    <Content state = {this.state}  onChangeSearch = {this.onChangeSearch}
     onChangeJobLoc = {this.onChangeJobLoc} onChangeFT = {this.onChangeFT}
    />

        </div> 
  
    );        
  }
}
