import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchSpaceships } from '../store';
import Navbar from './Navbar'
import Home from './Home'
import ProductsList from './ProductsList'

export default class Main extends Component {

    // componentDidMount() {
    //     const spaceshipsThunk = fetchSpaceships();
    //     store.dispatch(spaceshipsThunk);
    // }

    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <Switch>
                        <Route exact path="/spaceships" component={ProductsList} />
                        <Route path="/" component={Home} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}


