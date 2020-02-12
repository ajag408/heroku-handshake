import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home.component';
import CreateStudent from './create-student.component';
import CreateCompany from './create-company.component';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/signup-student' component={CreateStudent}></Route>
      <Route exact path='/signup-company' component={CreateCompany}></Route>
    </Switch>
  );
}

export default Main;