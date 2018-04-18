
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import store, { fetchSpaceships } from '../store';
import Navbar from './Navbar'
import Home from './Home'
import ProductPage from './ProductPage'
import ProductsList from './ProductsList'
import UpdateSpaceship from './editProductForm';

export default class Main extends Component {

    componentDidMount() {
        const spaceshipsThunk = fetchSpaceships();
        store.dispatch(spaceshipsThunk);
    }

    render() {
        return (
            <div>
                <Navbar />
                <main>
                    <Switch>
                        <Route path="/update/spaceship/:id" component={UpdateSpaceship} />
                        <Route path="/spaceships/:spaceshipId" component={ProductPage} />
                        <Route exact path="/spaceships" component={ProductsList} />
                        <Route exact path="/" component={Home} />
                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}

