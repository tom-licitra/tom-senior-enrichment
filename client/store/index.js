import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  schools: [],
  students: []
}

// ACTION TYPES
const SET_SCHOOLS = 'SET_SCHOOLS';
const DELETE_SCHOOL = 'DELETE_SCHOOL';
const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
const CREATE_SCHOOL = 'CREATE_SCHOOL';

const SET_STUDENTS = 'SET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';

// ACTION CREATORS
const setSchools = (schools) => ({ type: SET_SCHOOLS, schools });
const _deleteSchool = (school) => ({ type: DELETE_SCHOOL, school });
const _updateSchool = (school) => ({ type: UPDATE_SCHOOL, school });
const _createSchool = (school) => ({ type: CREATE_SCHOOL, school });

const setStudents = (students) => ({ type: SET_STUDENTS, students });
const _deleteStudent = (student) => ({ type: DELETE_STUDENT, student });
const _updateStudent = (student) => ({ type: UPDATE_STUDENT, student });
const _createStudent = (student) => ({ type: CREATE_STUDENT, student });

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


export const getStudents = () => {
  return (dispatch) => {
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(setStudents(students)))
  }
}

export const deleteStudent = (student, history) => {
  return (dispatch) => {
    const id = student.id;
    axios.delete(`/api/students/${id}`)
      .then(() => dispatch(_deleteStudent(student)))
      .then(() => axios.get('/api/schools')
        .then(res => res.data)
        .then(schools => dispatch(setSchools(schools))))
      .then(() => !!history && history.push("/students"))
  }
}

export const updateStudent = (id, data) => {
  return (dispatch) => {
    axios.put(`/api/students/${id}`, data)
      .then(res => res.data)
      .then( student => dispatch(_updateStudent(student)))
      .then(() => axios.get('/api/schools')
        .then(res => res.data)
        .then(schools => dispatch(setSchools(schools))))
  }
}

export const createStudent = (data) => {
  return (dispatch) => {
    axios.post('/api/students', data)
      .then(res => res.data)
      .then( student => dispatch(_createStudent(student)))
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

const studentsReducer = (students = initialState.students, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students
    case DELETE_STUDENT:
      return students.filter(student => student.id !== action.student.id)
    case UPDATE_STUDENT:
      return students.map( student => (student.id === action.student.id ? action.student : student))
    case CREATE_STUDENT:
      return [...students, action.student]
    default:
      return students
  }
}

const reducer = combineReducers({
  schools: schoolsReducer,
  students: studentsReducer
})

export default createStore(reducer, applyMiddleware(logger, thunk));
