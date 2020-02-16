import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home.component';
import CreateStudent from './Student/create-student.component';
import CreateCompany from './Company/create-company.component';
import CompanySignin from './Company/company-signin.component';
import StudentSignin from './Student/student-signin.component';
import CompanyJobPosting from './Company/companyland.component'


const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/signup-student' component={CreateStudent}></Route>
      <Route exact path='/signup-company' component={CreateCompany}></Route>
      <Route exact path='/company-signin' component={CompanySignin}></Route>
      <Route exact path='/student-signin' component={StudentSignin}></Route>
      <Route exact path='/company' component={CompanyJobPosting}></Route>
    </Switch>
  );
}

export default Main;