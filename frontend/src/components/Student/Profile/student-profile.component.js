
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navigator from '../studentNav.component';
import Content from './studentProfContent.component';
import {
  displayStudent, updateStudent, addEducation, addExperience, updateSkillset, uploadProfPic,
} from '../../../js/actions/index';


class DisplayStudent extends Component {
  constructor(props) {
    super(props);


    // Setting up functions
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
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
    this.onUpload = this.onUpload.bind(this);


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
      skillset: '',
    };
    const {
      displayStudent: display,
    } = this.props;
    display(this.state);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    console.log(newProps);
    this.setState({
      name: newProps.name,
      dob: newProps.dob,
      city: newProps.city,
      state: newProps.state,
      country: newProps.country,
      careerObjective: newProps.careerObjective,
      email: newProps.email,
      phone: newProps.phone,
      profPic: newProps.profPic,
      education: newProps.education,
      collegeName: newProps.collegeName,
      educationLocation: newProps.educationLocation,
      degree: newProps.degree,
      major: newProps.major,
      gradYear: newProps.gradYear,
      gpa: newProps.gpa,
      experience: newProps.experience,
      companyName: newProps.companyName,
      jobTitle: newProps.jobTitle,
      jobLocation: newProps.jobLocation,
      stDate: newProps.stDate,
      endDate: newProps.endDate,
      workDescription: newProps.workDescription,
      skillset: newProps.skillset,
    });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }


  onChangeDob(e) {
    this.setState({ dob: e.target.value });
  }

  onChangeCity(e) {
    this.setState({ city: e.target.value });
  }

  onChangeState(e) {
    this.setState({ state: e.target.value });
  }

  onChangeCountry(e) {
    this.setState({ country: e.target.value });
  }

  onChangeCareerObjective(e) {
    this.setState({ careerObjective: e.target.value });
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeStudentPhone(e) {
    this.setState({ phone: e.target.value });
  }

  onChangeCollegeName(e) {
    this.setState({ collegeName: e.target.value });
  }

  onChangeEducationLocation(e) {
    this.setState({ educationLocation: e.target.value });
  }

  onChangeDegree(e) {
    this.setState({ degree: e.target.value });
  }

  onChangeMajor(e) {
    this.setState({ major: e.target.value });
  }

  onChangeGradYear(e) {
    this.setState({ gradYear: e.target.value });
  }

  onChangeGPA(e) {
    this.setState({ gpa: e.target.value });
  }

  onChangeCompanyName(e) {
    this.setState({ companyName: e.target.value });
  }

  onChangeJobTitle(e) {
    this.setState({ jobTitle: e.target.value });
  }

  onChangeJobLocation(e) {
    this.setState({ jobLocation: e.target.value });
  }

  onChangeStartDate(e) {
    this.setState({ stDate: e.target.value });
  }

  onChangeEndDate(e) {
    this.setState({ endDate: e.target.value });
  }

  onChangeWorkDescription(e) {
    this.setState({ workDescription: e.target.value });
  }

  onChangeSkillset(e) {
    this.setState({ skillset: e.target.value });
  }


  onSubmit(e) {
    e.preventDefault();
    const {
      name, dob, city, state, country, careerObjective, email, phone,
    } = this.state;
    const { updateStudent: update } = this.props;
    const studentObject = {
      name,
      dob,
      city,
      state,
      country,
      careerObjective,
      email,
      phone,

    };
    update(studentObject);
  }


  onSubmitEducation(e) {
    e.preventDefault();
    const {
      collegeName, educationLocation, degree, major, gradYear, gpa,
    } = this.state;
    const { addEducation: educate } = this.props;
    const educationObject = {
      collegeName,
      loc: educationLocation,
      degree,
      major,
      gradYear,
      gpa,


    };
    educate(educationObject);
  }

  onSubmitExperience(e) {
    e.preventDefault();
    console.log(this.state);
    const {
      companyName, jobLocation, jobTitle, stDate, endDate, workDescription,
    } = this.state;
    const { addExperience: experience } = this.props;
    const experienceObject = {
      companyName,
      loc: jobLocation,
      title: jobTitle,
      startDate: stDate,
      endDate,
      description: workDescription,


    };
    experience(experienceObject);
  }

  onSubmitSkillset(e) {
    e.preventDefault();
    const {
      skillset,
    } = this.state;
    const { updateSkillset: skillz } = this.props;
    const skillsetObject = {

      skillset,


    };

    skillz(skillsetObject);
  }

  onUpload(e) {
    e.preventDefault();
    const { uploadProfPic: prof } = this.props;
    const { files } = document.getElementById('INPUT_TAG');
    console.log(files);
    const formData = new FormData();
    formData.append('image', files[0]);
    // console.log(this.props.uploadProfPic);
    console.log(this.props);
    prof(formData);
    console.log(files[0]);
  }

  render() {
    return (
      <div>
        <Navigator />
        <Content
          onSubmit={this.onSubmit}
          state={this.state}
          onChangeName={this.onChangeName}
          onChangeDob={this.onChangeDob}
          onChangeCity={this.onChangeCity}
          onChangeState={this.onChangeState}
          onChangeCountry={this.onChangeCountry}
          onChangeCareerObjective={this.onChangeCareerObjective}
          onChangeStudentEmail={this.onChangeStudentEmail}
          onChangeStudentPhone={this.onChangeStudentPhone}
          onUpload={this.onUpload}
          onChangeCollegeName={this.onChangeCollegeName}
          onChangeEducationLocation={this.onChangeEducationLocation}
          onChangeDegree={this.onChangeDegree}
          onChangeMajor={this.onChangeMajor}
          onChangeGPA={this.onChangeGPA}
          onChangeGradYear={this.onChangeGradYear}
          onSubmitEducation={this.onSubmitEducation}
          onChangeCompanyName={this.onChangeCompanyName}
          onChangeJobLocation={this.onChangeJobLocation}
          onChangeJobTitle={this.onChangeJobTitle}
          onChangeStartDate={this.onChangeStartDate}
          onChangeEndDate={this.onChangeEndDate}
          onChangeWorkDescription={this.onChangeWorkDescription}
          onChangeSkillset={this.onChangeSkillset}
          onSubmitSkillset={this.onSubmitSkillset}
          onSubmitExperience={this.onSubmitExperience}

        />

      </div>

    );
  }
}
DisplayStudent.propTypes = {
  displayStudent: PropTypes.func.isRequired,
  updateStudent: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  addExperience: PropTypes.func.isRequired,
  updateSkillset: PropTypes.func.isRequired,
  uploadProfPic: PropTypes.func.isRequired,
};
function mapDispatchToProps(dispatch) {
  return {
    displayStudent: (student) => dispatch(displayStudent(student)),
    updateStudent: (student) => dispatch(updateStudent(student)),
    addEducation: (education) => dispatch(addEducation(education)),
    addExperience: (experience) => dispatch(addExperience(experience)),
    updateSkillset: (skillset) => dispatch(updateSkillset(skillset)),
    uploadProfPic: (formData) => dispatch(uploadProfPic(formData)),
  };
}
const mapStateToProps = (state) => ({
  name: state.name,
  dob: state.dob,
  city: state.city,
  state: state.state,
  country: state.country,
  careerObjective: state.careerObjective,
  email: state.email,
  phone: state.phone,
  profPic: state.profPic,
  education: state.education,
  collegeName: state.collegeName,
  educationLocation: state.educationLocation,
  degree: state.degree,
  major: state.major,
  gradYear: state.gradYear,
  gpa: state.gpa,
  experience: state.experience,
  companyName: state.companyName,
  jobTitle: state.jobTitle,
  jobLocation: state.jobLocation,
  stDate: state.stDate,
  endDate: state.endDate,
  workDescription: state.workDescription,
  skillset: state.skillset,
});

const StudentProfile = connect(mapStateToProps, mapDispatchToProps)(DisplayStudent);

export default StudentProfile;
