import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
    <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
      <Link to={'/'}>
        <img src="/images/logo_sq.jpg" className="logo" />
        <h1 className="header">Aquila Spaceships Store</h1>
      </Link> 
       <span className="nav-container">
          <span className="navbar-header">
              <button type="button" className="navbar-toggle collapsed our-btn-menu" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" >
                  {/*}
                <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
*/}
              <span>Menu</span>
              </button>
          </span>
        {isLoggedIn ? (
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                  <li><Link to="/home">Account Home</Link></li>
                  <li><a href="#" onClick={handleClick}>
                    Logout
                  </a></li>
                  {isAdmin ? <li><Link to={'/spaceships/new'}>Add New Spaceship</Link></li> : null }
              </ul>
          </div>
        ) : (
          // <span class="dropdown">
          //   {/* The navbar will show these links before you log in */}
          //   <Link to="/login">Login</Link>
          //   <Link to="/signup">Sign Up</Link>
          // </span>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </div>
          
        )}
      </span>
    </nav>
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
