import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


function ProductsList(props) {

  const { spaceships } = props;
  return (
    <div className="all-container">
      {
        spaceships.map(spaceship => {
          return (
            <span key={spaceship.id} className="all-item">
              <NavLink to={`/spaceships/${spaceship.id}`}>
                <img src={spaceship.image} />
                <div>
                  <span> {spaceship.title}</span>
                </div>
              </NavLink>
            </span>
          );
        })
      }
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    spaceships: state.spaceships
  };
};

export default withRouter(connect(mapStateToProps)(ProductsList));
