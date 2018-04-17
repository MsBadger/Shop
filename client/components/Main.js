
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchSpaceships } from '../store';
import Navbar from './Navbar'
import Home from './Home'

export default class Main extends Component {

    componentDidMount() {
        const spaceshipsThunk = fetchSpsceships();
        store.dispatch(spaceshipsThunk);
    }

    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <Switch>
                        <Route path="/" component={Home} />
                        <Route path="/allShips" component={ProductsList} />
                        <Route path="/allShips/id" component={ProductInfo} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}