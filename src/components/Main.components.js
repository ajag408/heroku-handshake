import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home.component';
import CreateStudent from './Student/create-student.component';
import CreateCompany from './Company/create-company.component';
import CompanySignin from './Company/company-signin.component';
import StudentSignin from './Student/student-signin.component';
import CompanyJobPosting from './Company/companyland.component';
import CompanyProfile from './Company/company-profile.component';
import CompanyStudentsTab from './Company/company-studentsTab.component';
import MakeEvents from './Company/make-events.component';
import JobSearch from './Student/studentland.component';
import StudentProfile from './Student/student-profile.component';
import ViewStudentProfile from './Student/view-student.component';
import ViewCompanyProfile from './Company/view-company.component';
import Applications from './Student/applications.component';
import ViewEvents from './Student/view-events.component';

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
      <Route exact path='/student/:id' component={ViewStudentProfile}></Route>
      <Route exact path='/company/:id' component={ViewCompanyProfile}></Route>
      
    </Switch>
  );
}

export default Main;