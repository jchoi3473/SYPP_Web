import { combineReducers} from 'redux';
import applicationReducer from './application-reducer/applicationReducer'
import filteredProgressReducer from './filteredProgress-reducer/filteredProgressReducer'

export default combineReducers({
    application : applicationReducer,
    filteredProgress: filteredProgressReducer,
    // requestProgress : requestProgressReducer
})