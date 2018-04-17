import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchSingleSpaceship } from '../store'

export default class ProductPage extends Component {

	componentDidMount () {
		console.log('COMPONENT MOUNTED')
		const spaceshipId = this.props.match.params.spaceshipId;
		const productPageThunk = fetchSingleSpaceship(spaceshipId);

		store.dispatch(productPageThunk);

	}

	render () {

		return (
			<div>
				<h3>{this.props.spaceship.title}</h3>
			</div>
		)

	}

}

// const mapStateToProps = (state) => {
// 	return {
// 		spaceship: state.spaceship
// 	};
// };

// const ProductPageContainer = withRouter(connect(mapStateToProps)(ProductPage))
// export default ProductPageContainer
