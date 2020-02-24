  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './jobSearchContent.component';


export default class JobSearch extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
    this.onChangeSearchFilter = this.onChangeSearchFilter.bind(this);
    this.onChangeSearchLoc = this.onChangeSearchLoc.bind(this);
    // this.onChangeJobLoc= this.onChangeJobLoc.bind(this);


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
      selectedIN: false
      
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




  // onChangeFT(e) {
  //   console.log("hello");
  //   console.log(this.state.selectedFT);
  //   var FT = [];
  //   if(this.state.selectedFT){
  //     for(var i =0;i<this.state.jobs.length; i++){
  //       if(this.state.jobs[i].cat == "Full Time"){
  //         FT.push(this.state.jobs[i]);
  //       }
  //     }
  //     this.setState({
  //       jobs : FT    
  //     });
  //   } else {
  //     if(this.state.search.length > 0){
  //       const searchObject = {
  //         search : this.state.search,
  //      };
 
  //      axios.post('http://localhost:4000/students/searchJobs', searchObject)
  //      .then((response) => {

  //         this.setState({
  //           jobs : response.data,
            
  //         });
  //           // console.log(this.state.jobs);
  //        });
  //     }
  //   }
  // }

  onChangeSearchInput(e) {
    // if(e.target.value.length>0){
      console.log("etargetval");
      console.log(e.target.value);
      this.setState({search: e.target.value}, () =>{
        console.log(this.state.search);
        if(this.state.search.length > 0){
          var filter = [];
          const filterObject = {
            "Full Time" : this.state.selectedFT,
            "Part Time": this.state.selectedPT,
            "On Campus" : this.state.selectedON,
            "Intern" : this.state.selectedIN,
         };
         for( const [name, value] in filterObject){
           if(value == true){
             filter.push(name);
           }
         }
            const searchObject = {
              search : this.state.search,
           };
     
           axios.post('http://localhost:4000/students/searchJobs', searchObject)
           .then((response) => {

                if(filter.length>0){
                  for(var i =0;i<response.data.length; i++){
                    if(filter.includes(response.data[i].cat)){
                      this.state.jobs.push(response.data[i]);
                    }
                  }
                }
                else {
                   this.setState({
                    jobs : response.data,
                    
                     });
                }
                console.log(this.state.jobs);
             });
 

  
        } else {
          this.setState({
           jobs : [],
            
        });
        }


    } );
     
  }
    // } else {

  onChangeSearchFilter(e) {  
      if(this.state.search.length > 0){
        var filter = [];
        const filterObject = {
          "Full Time" : this.state.selectedFT,
          "Part Time": this.state.selectedPT,
          "On Campus" : this.state.selectedON,
          "Intern" : this.state.selectedIN,
       };
       console.log(filterObject);
       for( const filterName in filterObject){
         if(filterObject[filterName] == true){
           console.log(filterName);
           filter.push(filterName);
         }
       }
       console.log(filter);
       console.log(this.state.search);
          const searchObject = {
            search : this.state.search,
         };
   
         axios.post('http://localhost:4000/students/searchJobs', searchObject)
         .then((response) => {
              this.setState({
                jobs : [],
                
                });
              if(filter.length>0){
                var filtered = [];
                for(var i =0;i<response.data.length; i++){
                  if(filter.includes(response.data[i].cat)){
                    filtered.push(response.data[i]);
                  }
                }
                this.setState({
                  jobs : filtered,
                  
                  });
              }
              else {
                 this.setState({
                  jobs : response.data,
                  
                   });
              }
              console.log(this.state.jobs);
           });



      } else {
        this.setState({
         jobs : [],
          
      });
      }
    }
  
    onChangeSearchLoc(e) {
      this.setState({loc: e.target.value})
    }



  render() {



    return (  <div>
    <Navigator/>
    <Content state = {this.state}  onChangeSearchInput = {this.onChangeSearchInput}
    onChangeSearchFilter = {this.onChangeSearchFilter}
     onChangeJobLoc = {this.onChangeJobLoc} 
    />

        </div> 
  
    );        
  }
}
