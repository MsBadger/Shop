import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function ProductsList(props) {

  const { spaceships } = props;
  return (
    <ul>
      {
        spaceships.map(spaceship => {
          return (
            <li key={spaceship.id}>
              <NavLink to={`/spaceships/${spaceship.id}`}>
                <span> {spaceship.name}</span>
                <img> {spaceship.image}</img>
              </NavLink>
            </li>
          );
        })
      }
    </ul>
  );
}

const mapStateToProps = function (state) {
  return {
    spaceships: state.spaceships
  };
};

export default withRouter(connect(mapStateToProps)(ProductsList));