import React, { Component } from 'react';
import store, { updateSpaceshipInfo } from '../store';
import { Link, Redirect } from 'react-router-dom'
import { fetchSingleSpaceship } from '../store/spaceship';


export default class UpdateSpaceship extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            price: '',
            inventory: '',
            vesselType: '',
            capacity: '',
            image: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.id;

        this.unsubscribe = store.subscribe(() => {
            this.setState({
                title: store.getState().spaceship.title,
                description: store.getState().spaceship.description,
                price: store.getState().spaceship.price,
                inventory: store.getState().spaceship.inventory,
                vesselType: store.getState().spaceship.vesselType,
                capacity: store.getState().spaceship.capacity,
                image: store.getState().spaceship.image
            })
        })
        store.dispatch(fetchSingleSpaceship(id));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSubmit(event) {
        event.preventDefault();
        const spaceship = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            inventory: this.state.inventory,
            vesselType: this.state.vesselType,
            capacity: this.state.capacity,
            image: this.state.image
        };

        const id = this.props.match.params.id
        store.dispatch(updateSpaceshipInfo(id, spaceship))
            .then((dispatch) => {
                this.props.history.push('/spaceships');
            })
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit} className='form'>
                    <div>
                        <label>Title:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='make'
                                value={this.state.title}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Description:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='model'
                                value={this.state.description}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Price:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='type'
                                value={this.state.price}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Inventory:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='year'
                                value={this.state.inventory}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Vessel Type:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='cost'
                                value={this.state.vesselType}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Capacity:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='description'
                                value={this.state.capacity}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Image:
                        <input
                                type='text'
                                onChange={this.handleChange}
                                name='imageUrl'
                                value={this.state.image}
                            />
                        </label>
                    </div>

                    <button type="submit" className='button'>UPDATE</button>

                </form>
            </div>

        )
    }
}