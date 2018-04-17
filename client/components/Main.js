
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchSpaceships } from '../store';
import Navbar from './Navbar'
import Home from './Home'
import ProductPage from './ProductPage'

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
                        <Route path="/spaceships" component={ProductsList} />
                        <Route path="/spaceships/:spaceshipId" component={ProductPage} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}