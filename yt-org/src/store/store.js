import { createStore } from 'redux';
import dataReducer from './reducer.js'

let store = createStore(dataReducer)

export default store