import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
<<<<<<< HEAD
=======
  <Link to={'/'}>
>>>>>>> 1c8eb7289ab9da62bb27dd8bc7c5f81091d914f9
    <img src="/images/logo_sq.jpg" className="logo" />
    <h1 className="header">Aquila Spaceships Store</h1>
  </Link>    
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
<<<<<<< HEAD
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
=======
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      { isAdmin ? <Link to={'/spaceships/new'}>Add New Spaceship</Link> : null }
>>>>>>> 1c8eb7289ab9da62bb27dd8bc7c5f81091d914f9
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isAdmin: state.user.isAdmin,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
