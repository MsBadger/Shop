import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store'
import { fetchSingleSpaceship } from '../store/spaceship.js'

export class ProductPage extends Component {

	componentDidMount () {
		const spaceshipId = this.props.match.params.spaceshipId;
		const productPageThunk = fetchSingleSpaceship(spaceshipId);
		store.dispatch(productPageThunk);
	}

	render () {

		return (
			<div>
				<h3>{this.props.spaceship.title}</h3>
				<img src={this.props.spaceship.image} />
				<span>${this.props.spaceship.priceInMills}</span>
				<div>{this.props.spaceship.description}</div>
				<span>Max. capacity: {this.props.spaceship.capacity} people</span>
			</div>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		spaceship: state.spaceship
	};
};

const ProductPageContainer = withRouter(connect(mapStateToProps)(ProductPage))
export default ProductPageContainer
