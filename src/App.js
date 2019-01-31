import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';
import Info from './components/Info';
import NotFound from './components/NotFound';

export default class App extends Component {
    render() {
        console.log(process.env.PUBLIC_URL);
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path={`/${process.env.PUBLIC_URL}/404`} component={NotFound}/>
                    <Route path={`/${process.env.PUBLIC_URL}/tasks/:id`} component={Info}/>
                    <Route path={`/${process.env.PUBLIC_URL}/:tab?`} component={Main} />
                </Switch>
            </BrowserRouter>
        );
    }
}

