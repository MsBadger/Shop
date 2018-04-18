import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store'
import { fetchSingleSpaceship } from '../store/spaceship.js'

export class ProductPage extends Component {

	componentDidMount() {
		const spaceshipId = this.props.match.params.spaceshipId;
		const productPageThunk = fetchSingleSpaceship(spaceshipId);
		store.dispatch(productPageThunk);
	}

	render() {
		const spaceshipId = this.props.match.params.spaceshipId;
		return (
			<div className="single">
				<span>
					<h3>{this.props.spaceship.title}</h3>
					<img src={this.props.spaceship.image} />
				</span>
				<span className="single-details">
					<div>${this.props.spaceship.priceInMills}</div>
					<div>{this.props.spaceship.description}</div>
					<span>Max. capacity: {this.props.spaceship.capacity} people</span>
					{this.props.isAdmin ?
						<div className="button">
							<Link to={`/spaceships/edit/${spaceshipId}`}>Edit Product</Link>
						</div>
						: null
					}
				</span>
			</div>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		spaceship: state.spaceship,
		user: state.user,
		isAdmin: state.user.isAdmin
	};
};

const ProductPageContainer = withRouter(connect(mapStateToProps)(ProductPage))
export default ProductPageContainer
