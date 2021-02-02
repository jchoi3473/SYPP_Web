import { combineReducers} from 'redux';
import applicationReducer from './application-reducer/applicationReducer'
import filteredProgressReducer from './filteredProgress-reducer/filteredProgressReducer'
import addAppReducer from './addApp-reducer/addAppReducer'
import categoriesReducer from './categories-reducer/categoriesReducer'
import companyReducer from './company-reducer/companyReducer'
export default combineReducers({
    addApp : addAppReducer,
    categories: categoriesReducer,
    application : applicationReducer,
    filteredProgress: filteredProgressReducer,
    companies: companyReducer
    // requestProgress : requestProgressReducer
})