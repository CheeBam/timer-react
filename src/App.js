import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import Main from './components/Main';
import Info from './components/Info';
import NotFound from './components/NotFound';

export default class App extends Component {
    render() {
        const { PUBLIC_URL } = process.env;

        console.log(PUBLIC_URL);

        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path='/404' component={NotFound}/>
                    <Route path='/tasks/:id' component={Info}/>
                    <Route path='/:tab?' component={Main} />
                </Switch>
            </BrowserRouter>
        );
    }
}

