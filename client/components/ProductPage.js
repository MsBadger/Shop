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
		let inventoryArr = [];
		for (let i = 1; i <= this.props.spaceship.inventory; i++) {
			inventoryArr.push(i);
		}

		let ratings = []
        // this.props.spaceship.review.map((reviewObj) => {
        //     ratings.push(reviewObj.rating)
        // })
        // let avg = ratings.reduce((a, b) => a + b, 0) / ratings.length
        
        console.log('first review?', this.props.reviews)
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

					<form onSubmit={this.props.handleSubmit}>
						<div>
							<select name="quantitySelection"> {inventoryArr.length ? inventoryArr.map(quantity => {
								return (
									<option key={quantity} value={quantity}>{quantity}</option>
								)
							})
								: <option value="0"> Out Of Stock </option>
							}
							</select>

							<button className="button" type="submit"> Add To Cart </button>

							{this.props.isAdmin ?
								<div className="button">
									<Link to={`/spaceships/edit/${spaceshipId}`}>Edit Product</Link>
								</div>
								: null
							}
						</div>
					</form>
				</span>
			</div>
		)

	}

}

const mapStateToProps = (state) => {
	return {
		spaceship: state.spaceship,
		reviews: state.spaceship.reviews,
		user: state.user,
		isAdmin: state.user.isAdmin,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		handleSubmit: function (event) {
			event.preventDefault();

		}
	}
}
const ProductPageContainer = withRouter(connect(mapStateToProps)(ProductPage))
export default ProductPageContainer
