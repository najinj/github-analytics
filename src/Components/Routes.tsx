import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Details} from '../Pages/Details';  // or whatever the location is
import {Home} from '../Pages/Home'; // or whatever the location is

export default () => (
<Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Repository/:RepositoryId" component={Details} />

    </Switch>
</Router>
);
// <Route exact path="/Repository/:RepositoryId" component={Details} />
