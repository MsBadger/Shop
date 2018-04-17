import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store, { fetchSpaceships } from '../store';
import {Login, Signup, UserHome} from './index.js'
import Navbar from './Navbar';
import Home from './Home';
import ProductPage from './ProductPage';
import ProductsList from './ProductsList';
import {me} from '../store'


class Main extends Component {

    componentDidMount() {
        this.props.loadInitialData()

        const spaceshipsThunk = fetchSpaceships();

        store.dispatch(spaceshipsThunk);
    }

    render() {
        const {isLoggedIn} = this.props

        return (
            <div>
                <Navbar />
                <main>
                    <Switch>

                        <Route path="/spaceships/:spaceshipId" component={ProductPage} />
                        <Route exact path="/spaceships" component={ProductsList} />
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        {
                          isLoggedIn &&
                            <Switch>
                              {/* Routes placed here are only available after logging in */}
                              <Route path="/home" component={UserHome} />
                            </Switch>
                        }
                        {/* Displays our Login component as a fallback */}
                        
                        <Route component={Login} />

                        <Redirect to="/" />
                    </Switch>
                </main>
            </div>
        );
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


