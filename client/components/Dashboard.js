import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const getAvgGpa = (school) => {
  if (school.students) {
    const gpaSum =  school.students.reduce( (sum, student) => {
      return sum + (1 * student.gpa);
    }, 0)
    return (gpaSum / school.students.length)
  }
  return 0;
}

const Dashboard = ({ history, schools, students, highestEnrollmentSchool, highestAvgGpaSchool, highestGpaStudent, enrollmentPercentage}) => {
  if (schools) {
    return (
      <div id="dashboard">
        <div className="dashboardPanel">
          <div className="dashboardFact">
            <div className="dashboardTitle">Total Schools</div>
            <div className="dashboardValue" onClick={() => history.push("/schools")}>{ schools ? schools.length : 0} schools</div>
          </div>
          <div className="dashboardFact">
            <div className="dashboardTitle">Highest Enrollment</div>
            <div className="dashboardValue" onClick={() => history.push(`/schools/${highestEnrollmentSchool.id}`)}>
              {highestEnrollmentSchool.name}
              <br />
              ({highestEnrollmentSchool.students.length} students)
            </div>
          </div>
          <div className="dashboardFact">
            <div className="dashboardTitle">Highest Avg GPA</div>
            <div className="dashboardValue" onClick={() => history.push(`/schools/${highestAvgGpaSchool.id}`)}>
              {highestAvgGpaSchool.name}
              <br />
              ({Math.round(100 * getAvgGpa(highestAvgGpaSchool)) / 100})
            </div>
          </div>
        </div>
        <div className="dashboardPanel">
          <div className="dashboardFact">
            <div className="dashboardTitle">Total Students</div>
            <div className="dashboardValue" onClick={() => history.push("/students")}>{ students ? students.length : 0} students</div>
          </div>
          <div className="dashboardFact">
            <div className="dashboardTitle">Enrollment Percentage</div>
            <div className="dashboardValue" onClick={() => history.push("/students")}>
              {enrollmentPercentage}%
              <br />
              ({ students ? students.filter(student => !!student.schoolId).length : 0 }/{students.length})
            </div>
          </div>
          <div className="dashboardFact">
            <div className="dashboardTitle">Highest GPA</div>
            <div className="dashboardValue" onClick={() => history.push(`/students/${highestGpaStudent.id}`)}>
              {highestGpaStudent.firstName} {highestGpaStudent.lastName}
              <br />
              ({highestGpaStudent.gpa})
            </div>
          </div>
        </div>
      </div>
    )
  }
  else { return <div>Loading...</div>}
}

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.props.history,
  schools: state.schools,
  students: state.students,
  highestEnrollmentSchool: state.schools.reduce((topSchool, school) => {
    if (school.students.length > topSchool.students.length) return school;
    else return topSchool;
  }, {students: []}),
  highestAvgGpaSchool: state.schools.reduce((topSchool, school) => {
    if (getAvgGpa(school) > getAvgGpa(topSchool)) return school;
    else return topSchool;
  }, {}),
  highestGpaStudent: state.students.reduce((topStudent, student) => {
      if ((1 * student.gpa) > (1 * topStudent.gpa)) return student;
      else return topStudent;
    }, {gpa: 0}),
  enrollmentPercentage: Math.round(100 * state.students.filter(student => !!student.schoolId).length / state.students.length)
})

export default connect(mapStateToProps)(Dashboard);
