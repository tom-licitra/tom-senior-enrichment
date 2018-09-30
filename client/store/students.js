import axios from 'axios';
import { setSchools } from './schools';

const initialState = {
  students: []
}

// ACTION TYPES
const SET_STUDENTS = 'SET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';

// ACTION CREATORS
export const setStudents = (students) => ({ type: SET_STUDENTS, students });
const _deleteStudent = (student) => ({ type: DELETE_STUDENT, student });
const _updateStudent = (student) => ({ type: UPDATE_STUDENT, student });
const _createStudent = (student) => ({ type: CREATE_STUDENT, student });

// THUNK CREATORS
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
      .then(() => axios.get('/api/schools')
        .then(res => res.data)
        .then(schools => dispatch(setSchools(schools))))
  }
}


// REDUCERS
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

export default studentsReducer;
