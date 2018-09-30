import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import schoolsReducer from './schools';
import studentsReducer from './students';

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer
})

export default createStore(reducer, applyMiddleware(logger, thunk));
