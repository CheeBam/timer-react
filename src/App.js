import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main';
import Info from './components/Info';
import NotFound from './components/NotFound';

const App = () => (
  <Switch>
    <Route exact path="/404" component={NotFound} />
    <Route path="/tasks/:id" component={Info} />
    <Route path="/:tab?" component={Main} />
  </Switch>
);

export default App;
