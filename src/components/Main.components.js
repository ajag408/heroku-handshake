import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Home from './home.component';
import CreateStudent from './Student/create-student.component';
import CreateCompany from './Company/create-company.component';
import CompanySignin from './Company/company-signin.component';
import StudentSignin from './Student/student-signin.component';
import CompanyJobPosting from './Company/Landing/companyland.component';
import CompanyProfile from './Company/Profile/company-profile.component';
import CompanyStudentsTab from './Company/StudentsTab/company-studentsTab.component';
import MakeEvents from './Company/Events/make-events.component';
import JobSearch from './Student/Landing/studentland.component';
import StudentProfile from './Student/Profile/student-profile.component';
import ViewStudentProfileFromCompany from './Student/Profile/view-studentFromCompany.component';
import ViewStudentProfileFromStudent from './Student/Profile/view-studentFromStudent.component';
import ViewCompanyProfile from './Company/Profile/view-company.component';
import Applications from './Student/Applications/applications.component';
import ViewEvents from './Student/Events/view-events.component';
import StudentSearch from './Student/StudentSearch/all-students.component';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/signup-student' component={CreateStudent}></Route>
      <Route exact path='/signup-company' component={CreateCompany}></Route>
      <Route exact path='/company-signin' component={CompanySignin}></Route>
      <Route exact path='/student-signin' component={StudentSignin}></Route>
      <Route exact path='/company/landing' component={CompanyJobPosting}></Route>
      <Route exact path='/company/profile' component={CompanyProfile}></Route>
      <Route exact path='/company/students' component={CompanyStudentsTab}></Route>
      <Route exact path='/company/events' component={MakeEvents}></Route>
      <Route exact path='/student/landing' component={JobSearch}></Route>
      <Route exact path='/student/profile' component={StudentProfile}></Route>
      <Route exact path='/student/applications' component={Applications}></Route>
      <Route exact path='/student/events' component={ViewEvents}></Route>
      <Route exact path='/student/students' component={StudentSearch}></Route>
      <Route exact path='/company/student/:id' component={ViewStudentProfileFromCompany}></Route>
      <Route exact path='/student/:id' component={ViewStudentProfileFromStudent}></Route>
      <Route exact path='/company/:id' component={ViewCompanyProfile}></Route>
      <Route render={() => <Redirect to={{pathname: "/"}} />} />
    </Switch>
  );
}

export default Main;