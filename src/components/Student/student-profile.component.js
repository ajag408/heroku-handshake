  
import React, { Component } from "react";
import axios from 'axios';
import Navigator from './studentNav.component';
import Content from './studentProfContent.component';


export default class StudentProfile extends Component {
  constructor(props) {
    super(props)



    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDob= this.onChangeDob.bind(this);
    this.onChangeCity= this.onChangeCity.bind(this);
    this.onChangeState= this.onChangeState.bind(this);
    this.onChangeCountry= this.onChangeCountry.bind(this);
    this.onChangeCareerObjective = this.onChangeCareerObjective.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPhone = this.onChangeStudentPhone.bind(this);
    this.onChangeCollegeName = this.onChangeCollegeName.bind(this);
    this.onChangeEducationLocation = this.onChangeEducationLocation.bind(this);
    this.onChangeDegree = this.onChangeDegree.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeGradYear = this.onChangeGradYear.bind(this);
    this.onChangeGPA = this.onChangeGPA.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEducation = this.onSubmitEducation.bind(this);
    this.onChangeCompanyName = this.onChangeCompanyName.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeJobLocation = this.onChangeJobLocation.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeWorkDescription = this.onChangeWorkDescription.bind(this);
    this.onChangeSkillset = this.onChangeSkillset.bind(this);
    this.onSubmitSkillset = this.onSubmitSkillset.bind(this);
    this.onSubmitExperience = this.onSubmitExperience.bind(this);


    // Setting up state
    this.state = {
      name: '',
      dob: '',
      city: '',
      state: '',
      country: '',
      careerObjective: '',
      email: '',
      phone: '',
      profPic: '',
      education: [],
      collegeName: '',
      educationLocation: '',
      degree: '',
      major: '',
      gradYear: '',
      gpa: '',
      experience: [],
      companyName: '',
      jobTitle: '',
      jobLocation: '',
      stDate: '',
      endDate: '',
      workDescription: '',
      skillset: ''
    }

    axios.get('http://localhost:4000/students/user')
    .then(res => {
      console.log(res.data);
      if(!res.data.isStudent){
        window.location.href = "/student-signin";
      } else {
        this.setState({
          name : res.data.user.name,
          dob: res.data.user.dob,
          city: res.data.user.city,
          state: res.data.user.state,
          country: res.data.user.country,
          careerObjective: res.data.user.careerObjective,
          email: res.data.user.email,
          phone: res.data.user.phone,
          profPic: 'http://localhost:4000/students/profPic/',
          skillset: res.data.user.skillset 
          });
      }
    });

    axios.get('http://localhost:4000/students/education')
    .then(res => {
      console.log(res.data);
      if(res.data.errno){
        alert(res.data);
      } else {
        this.setState({
            education: res.data
      });
    }
    });

    axios.get('http://localhost:4000/students/experience')
    .then(res => {
      console.log(res.data);
      if(res.data.errno){
        alert(res.data);
      } else {
        this.setState({
            experience: res.data
      });
      console.log(this.state);
    }
    });

    // axios.get('http://localhost:4000/companies/profPic')
    // .then(res => {
    //     console.log(res);
    //     this.setState({profPic: res});
    // })
}


  onChangeName(e) {
    this.setState({name: e.target.value})
  }


  onChangeDob(e) {
    this.setState({dob: e.target.value})
  }
  onChangeCity(e) {
    this.setState({city: e.target.value})
  }
  onChangeState(e) {
    this.setState({state: e.target.value})
  }
  onChangeCountry(e) {
    this.setState({country: e.target.value})
  }
  onChangeCareerObjective(e) {
    this.setState({careerObjective: e.target.value})
  }

  onChangeStudentEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangeStudentPhone(e) {
    this.setState({phone: e.target.value})
  }

  onChangeCollegeName(e) {
    this.setState({collegeName: e.target.value})
  }

  onChangeEducationLocation(e) {
    this.setState({educationLocation: e.target.value})
  }

  onChangeDegree(e) {
    this.setState({degree: e.target.value})
  }

  onChangeMajor(e) {
    this.setState({major: e.target.value})
  }

  onChangeGradYear(e) {
    this.setState({gradYear: e.target.value})
  }

  onChangeGPA(e) {
    this.setState({gpa: e.target.value})
  }

  onChangeCompanyName(e) {
    this.setState({companyName: e.target.value})
  }

  onChangeJobTitle(e) {
    this.setState({jobTitle: e.target.value})
  }

  onChangeJobLocation(e) {
    this.setState({jobLocation: e.target.value})
  }

  onChangeStartDate(e) {
    this.setState({stDate: e.target.value})
  }

  onChangeEndDate(e) {
    this.setState({endDate: e.target.value})
  }

  onChangeWorkDescription(e) {
    this.setState({workDescription: e.target.value})
  }

  onChangeSkillset(e) {
    this.setState({skillset: e.target.value})
  }





  onSubmit(e) {

    e.preventDefault()

    const studentObject = {
        name : this.state.name,
        dob: this.state.dob,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        careerObjective: this.state.careerObjective,
        email: this.state.email,
        phone: this.state.phone,

    };

    axios.put('http://localhost:4000/students/update-student-basic', studentObject)
      .then(res => {
          console.log(res);
          if(res.data.errno){
                alert("Unsuccessful update");
            } else {
                alert("Successful update");
                window.location.href = "/student/profile";
            }
        }     
      );
    // this.setState({title: '', created: '', deadline: '', loc: '', salary: '', description: '', cat: ''})
    
}



onSubmitEducation(e) {

  e.preventDefault()

  const educationObject = {
    collegeName: this.state.collegeName,
    loc: this.state.educationLocation,
    degree: this.state.degree,
    major: this.state.major,
    gradYear: this.state.gradYear,
    gpa: this.state.gpa


  };

  axios.post('http://localhost:4000/students/add-education', educationObject)
    .then(res => {
        console.log(res);
        if(res.data.errno){
              alert("Unsuccessful add");
          } else {
              alert("Successful add");
              window.location.href = "/student/profile";
          }
      }     
    );
  // this.setState({title: '', created: '', deadline: '', loc: '', salary: '', description: '', cat: ''})
  
}

onSubmitExperience(e) {

  e.preventDefault()
  console.log(this.state);
  const experienceObject = {
    companyName: this.state.companyName,
    loc: this.state.jobLocation,
    title: this.state.jobTitle,
    startDate: this.state.stDate,
    endDate: this.state.endDate,
    description: this.state.workDescription


  };

  // console.log(experienceObject);

  axios.post('http://localhost:4000/students/add-experience', experienceObject)
    .then(res => {
        console.log(res);
        if(res.data.errno){
              alert("Unsuccessful add");
          } else {
              alert("Successful add");
              window.location.href = "/student/profile";
          }
      }     
    );
  // this.setState({title: '', created: '', deadline: '', loc: '', salary: '', description: '', cat: ''})
  
}

onSubmitSkillset(e) {

  e.preventDefault()
  console.log(this.state);
  const skillsetObject = {

    skillset: this.state.skillset


  };

  axios.put('http://localhost:4000/students/update-skillset', skillsetObject)
    .then(res => {
        console.log(res);
        if(res.data.errno){
              alert("Unsuccessful update");
          } else {
              alert("Successful update");
              window.location.href = "/student/profile";
          }
      }     
    );
  // this.setState({title: '', created: '', deadline: '', loc: '', salary: '', description: '', cat: ''})
  
}

    onUpload(e){
        e.preventDefault();
        const files = document.getElementById('INPUT_TAG').files;
        console.log(files);
        const formData = new FormData();
        formData.append('image', files[0]);
        // console.log(formData);
        axios.post('http://localhost:4000/students/profPic', formData)
        .then(res => {
            if(res.data.errno){
              alert("Unsuccessful update");
            } else {
              alert(res.data);
              window.location.href = "/student/profile";
            }
          }     
        );
        console.log(files[0])
    }

  render() {



    return (  <div>
    <Navigator/>
    <Content onSubmit = {this.onSubmit} state = {this.state} onChangeName= {this.onChangeName} 
    onChangeDob= {this.onChangeDob}
    onChangeCity= {this.onChangeCity}
    onChangeState= {this.onChangeState}
    onChangeCountry= {this.onChangeCountry}
    onChangeCareerObjective= {this.onChangeCareerObjective}
    onChangeStudentEmail = {this.onChangeStudentEmail}
    onChangeStudentPhone = {this.onChangeStudentPhone}
    onUpload = {this.onUpload}
    onChangeCollegeName = {this.onChangeCollegeName}
    onChangeEducationLocation = {this.onChangeEducationLocation}
    onChangeDegree = {this.onChangeDegree}
    onChangeMajor = {this.onChangeMajor}
    onChangeGPA = {this.onChangeGPA}
    onChangeGradYear = {this.onChangeGradYear}
    onSubmitEducation = {this.onSubmitEducation}
    onChangeCompanyName = {this.onChangeCompanyName}
    onChangeJobLocation = {this.onChangeJobLocation}
    onChangeJobTitle = {this.onChangeJobTitle}
    onChangeStartDate = {this.onChangeStartDate}
    onChangeEndDate = {this.onChangeEndDate}
    onChangeWorkDescription= {this.onChangeWorkDescription}
    onChangeSkillset= {this.onChangeSkillset}
    onSubmitSkillset= {this.onSubmitSkillset}
    onSubmitExperience = {this.onSubmitExperience}
    
    
    
    
    
    />

        </div> 
  
    );        
  }
}
