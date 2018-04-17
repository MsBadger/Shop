import axios from 'axios';

/*** ACTION TYPES ***/
const GET_SPACESHIPS = 'GET_SPACESHIPS';
const GET_BY_CATEGORY = 'GET_SPACESHIP_CATEGORY'


/*** ACTION CREATORS ***/
const getSpaceships = spaceships => {
    return {
        type: GET_SPACESHIPS,
        spaceships
    }
}
//get spaceships by category
const getByCategory = spaceships => {
    return {
        type: GET_SPACESHIP_CATEGORY,
        spaceships
    }
}

/*** THUNK CREATORS ***/
export const fetchSpaceships = () => dispatch => {
    axios.get('/api/products')
        .then(res => res.data)
        .then(spaceships => {
            dispatch(getSpaceships(spaceships))
        })
        .catch(err => console.error('Fetching products/spaceships unsuccessful', err));
};

export const fetchByCategory = (category) => {
    axios.get(`/api/products/${category}`)
        .then(res => res.data)
        .then(spaceships => {
            dispatch(getByCategory(spaceships))
        })
        .catch(console.error('Fetching products/spaceships by category FAILED', err));
}


/*** REDUCER ***/
export default function (state = [], action) {
    switch (action.type) {
        case GET_SPACESHIPS:
            return action.getSpaceships;

        case GET_SPACESHIP_CATEGORY:
            return action.getByCategory;

        default:
            return state
    }
}


