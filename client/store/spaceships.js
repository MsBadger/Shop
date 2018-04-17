import axios from 'axios';

/*** ACTION TYPES ***/
const GET_SPACESHIPS = 'GET_SPACESHIPS';
const GET_BY_VESSEL_TYPE = 'GET_BY_VESSEL_TYPE'


/*** ACTION CREATORS ***/
const getSpaceships = spaceships => {
    return {
        type: GET_SPACESHIPS,
        spaceships
    }
}
//get spaceships by category
const getByVesselType = spaceships => {
    return {
        type: GET_BY_VESSEL_TYPE,
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

export const fetchByVesselType = (vesselType) => {
    axios.get(`/api/products/${vesselType}`)
        .then(res => res.data)
        .then(spaceships => {
            dispatch(getByVesselType(spaceships))
        })
        .catch(console.error('Fetching products/spaceships by vessel type FAILED', err));
}


/*** REDUCER ***/
export default function (state = [], action) {
    switch (action.type) {
        case GET_SPACESHIPS:
            return action.getSpaceships;

        case GET_BY_VESSEL_TYPE:
            return action.getByVesselType;

        default:
            return state
    }
}


