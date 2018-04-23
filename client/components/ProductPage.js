import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store';
import { fetchSingleSpaceship } from '../store/spaceship.js';
import { fetchReviews } from '../store/review.js'
import axios from 'axios'

export class ProductPage extends Component {

	componentDidMount() {
		const spaceshipId = this.props.match.params.spaceshipId;
		const productPageThunk = fetchSingleSpaceship(spaceshipId);
		const reviewsThunk = fetchReviews(spaceshipId);
		store.dispatch(productPageThunk); // using connect, so NO -- KHLG
		store.dispatch(reviewsThunk);
	}
// I would expect with your setup that there is an unmount that clears review store and single spaceship store. -- KHLG
	render() {
		const spaceshipId = this.props.match.params.spaceshipId;
		let inventoryArr = [];
		for (let i = 1; i <= this.props.spaceship.inventory; i++) {
			inventoryArr.push(i);
		}

		return (
			<div className="single">
				<span>
					<h3>{this.props.spaceship.title}</h3>
					<img src={this.props.spaceship.image} />
				</span>
				<div>Average Rating: {

					this.props.reviews ?
					Math.round(this.props.reviews.map((reviewObj) => {
			      		return reviewObj.rating;
			    	}).reduce((a, b) => a + b, 0) / this.props.reviews.length) :
			    	null

				}
				</div>
				<span className="single-details">
					<div>${this.props.spaceship.priceInMills}</div>
					<div>{this.props.spaceship.description}</div>
					<span>Max. capacity: {this.props.spaceship.capacity} people</span>
					<div>
						<h2>Reviews</h2>
						{	

							this.props.reviews ?
							this.props.reviews.map((review) => {
								return (
									<div key={this.props.reviews.map(function(review2) { return review2.body; }).indexOf(review.body)}>
										<div>Rating: {review.rating}</div>
										<div>{review.snippet}</div>
									</div>
								)
							}) : null
						}
					</div>

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
	console.log('this is the state', state)
	return {
		spaceship: state.spaceship, // could spaceships.find(s => s.id === sId) || {}. Then you don't need the store -- KHLG
		user: state.user,
		isAdmin: state.user.isAdmin,
		reviews: state.reviews

	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		// avgRating = function () {
		// 	if (this.props.reviews) {
		// 		let ratings = Math.round(this.props.reviews.map((reviewObj) => {
		//       return reviewObj.rating;
		//     }).reduce((a, b) => a + b, 0) / this.props.reviews.length)
		// 	} else {
		// 		return null;
		// 	}
		// },

		handleSubmit: function (event) {
			event.preventDefault();

		}
	}
}
const ProductPageContainer = withRouter(connect(mapStateToProps)(ProductPage))
export default ProductPageContainer
