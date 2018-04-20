import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin, userId }) => (
  <div>
    <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
      <Link to={'/'}>
        <img src="/images/logo_sq.jpg" className="logo" />
        <h1 className="header">Aquila Spaceships Store</h1>
      </Link>



      <Link to={`/weloveyou/${userId}`}>
        <img src='/images/cart.jpg' className='cart' />
      </Link>


      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {isLoggedIn
            ? <Link to="/home" className="dropdown-item">Account Home</Link>
            : <Link to="/login" className="dropdown-item" >Login</Link>}
          {isLoggedIn
            ? <a href="#" onClick={handleClick} className="dropdown-item" >Logout</a>
            : <Link to="/signup" className="dropdown-item">Sign Up</Link>}
          {isAdmin && <Link to={'/spaceships/new'} className="dropdown-item" >Add New Spaceship</Link>}
        </div>
      </div>


    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
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
