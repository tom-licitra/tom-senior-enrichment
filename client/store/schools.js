import axios from 'axios';
import { setStudents } from './students';

const initialState = {
  schools: []
}

// ACTION TYPES
const SET_SCHOOLS = 'SET_SCHOOLS';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
const CREATE_SCHOOL = 'CREATE_SCHOOL';

// ACTION CREATORS
export const setSchools = (schools) => ({ type: SET_SCHOOLS, schools });
const _deleteSchool = (school) => ({ type: DELETE_SCHOOL, school });
const _updateSchool = (school) => ({ type: UPDATE_SCHOOL, school });
const _createSchool = (school) => ({ type: CREATE_SCHOOL, school });

// THUNK CREATORS
export const getSchools = () => {
  return (dispatch) => {
    axios.get('/api/schools')
      .then(res => res.data)
      .then(schools => dispatch(setSchools(schools)))
  }
}

export const deleteSchool = (school, history) => {
  return (dispatch) => {
    const id = school.id;
    axios.delete(`/api/schools/${id}`)
      .then(() => dispatch(_deleteSchool(school)))
      .then(() => axios.get('/api/students')
        .then(res => res.data)
        .then(students => dispatch(setStudents(students))))
      .then(() => !!history && history.push("/schools"))
    }
}

export const updateSchool = (id, data) => {
  return (dispatch) => {
    axios.put(`/api/schools/${id}`, data)
      .then(res => res.data)
      .then( school => dispatch(_updateSchool(school)))
      .then(() => axios.get('/api/students')
        .then(res => res.data)
        .then(students => dispatch(setStudents(students))))}
}

export const createSchool = (data) => {
  return (dispatch) => {
    axios.post('/api/schools', data)
      .then(res => res.data)
      .then( school => dispatch(_createSchool(school)))
  }
}

// REDUCERS
const schoolsReducer = (schools = initialState.schools, action) => {
  switch (action.type) {
    case SET_SCHOOLS:
      return action.schools
    case DELETE_SCHOOL:
      return schools.filter(school => school.id !== action.school.id)
    case UPDATE_SCHOOL:
      return schools.map( school => (school.id === action.school.id ? action.school : school))
    case CREATE_SCHOOL:
      return [...schools, action.school]
    default:
      return schools
  }
}

export default schoolsReducer;
