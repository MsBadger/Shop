import { expect } from 'chai';
import { fetchSingleSpaceship } from './spaceship';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';


const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = { spaceship: {} }

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = mockStore(initialState);
    })

    afterEach(() => {
        mockAxios.restore();
        store.clearActions();
    })

    describe('fetchSingleSpaceship', (spaceshipId) => {
        it('eventually dispatches the GET_SPACESHIP action', () => {
            const fakeSpaceship = { title: 'LoveHater', id: 1 }
            mockAxios.onGet(`/api/products/${spaceshipId}`).replyOnce(200, fakeSpaceship)
            return store.dispatch(fetchSingleSpaceship())
                .then(() => {
                    const action = store.getAction()
                    expect(action[0].type).to.be.equal('GET_SPACESHIP')
                    expect(action[0].spaceship).to.be.deep.equal(fakeSpaceship)
                    expect(action[0].id).to.be.deep.equal(fakeSpaceship.id)
                })
        })
    })
})
