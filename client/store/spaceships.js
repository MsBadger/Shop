import axios from 'axios';

/*** ACTION TYPES ***/
const GET_SPACESHIPS = 'GET_SPACESHIPS';


/*** ACTION CREATORS ***/
const getSpaceships = spaceships => {
    return {
        type: GET_SPACESHIPS,
        spaceships
    }
}

/*** THUNK CREATORS ***/
export const fetchSpaceships = () => dispatch => {
    axios.get('/api/products')
        .then(res => dispatch(spaceships(res.data)))
        .catch(err => console.error('Fetching products/spaceships unsuccessful', err));
};


/*** REDUCER ***/
export default function (state = [], action) {
    switch (action.type) {
        case GET_SPACESHIPS:
            return action.getSpaceships;

        default:
            return state
    }
}


