import React from 'react';
import { connect } from 'react-redux';
import StudentListItem from './StudentListItem';

const Students = ({ students }) => {
  const viewLength = 10;
  if (students.length > 0) {
    return (
      <div id="students">
        {
        students.slice(0,viewLength).map( student => <StudentListItem key={student.id} student={student} />)
        }
      </div>
    )
  }
  return (
    <div id="students" />
  )
}

const mapStateToProps = (state) => ({students: state.students})

export default connect(mapStateToProps)(Students);
