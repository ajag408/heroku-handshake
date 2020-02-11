import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './home.component';
import CreateStudent from './create-student.component';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/signup' component={CreateStudent}></Route>
    </Switch>
  );
}

export default Main;