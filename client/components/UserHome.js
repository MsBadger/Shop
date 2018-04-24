import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import store, { fetchHistory, me } from '../store';

/**
 * COMPONENT
 */
export class UserHome extends Component {

  componentDidMount() {
    this.props.loadInitialData()
    const userId = this.props.userId
    console.log('USERID **', userId)
    this.props.loadHistory(userId)
  }

  // componentDidUpdate() {
  //   const userId = this.props.userId
  //   console.log('USERID **', userId)
  //   this.props.loadHistory(userId)
  // }
  render() {
    const { email } = this.props;
    //console.log("state for indiv user ", state)
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <div>
          {this.props.orders.map(orderHis => {
            return (
              <div>
                <span key={orderHis}>Order id{orderHis.id}</span>

                <span >Order status{orderHis.status}</span>
                <span >Order status{orderHis.spaceships}</span>
                {/* <span key={spaceship.id} className="cart-container" >
                  <span className="home-item cart-item">
                    <img src={spaceship.image} />
                  </span>
                  <span className="home-item cart-item">
                    <h1>{spaceship.title}</h1>
                    <h5 className="white" className="item-details">Capacity {spaceship.capacity}</h5>
                    <h5 className="white" >Price per item {spaceship.priceInMills}</h5>
                  </span> 
                </span>*/}

              </div>
            )
          })
          }
        </div>
      </div>
    )

  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    userId: state.user.id,
    orders: state.orders
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadHistory(userId) {
      dispatch(fetchHistory(userId))
    }
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
