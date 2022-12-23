import { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk } from '../../store/thunks';


/*
IMPORTANT: comments regarding implementation details!!
=====================================================
You'll see that we have two ways of interacting with the UI
in order to change the course's instructor
The dropdown menu is straighforward, it's pretty much the same 
as having the input field for the instructorId but allows us
to actually see the available insutrctors as well as their names, 
not just their IDs. We did have to connect to the allInstructors state
from the Redux store, as well as fetchAllInstructors in componentDidMount().
This was done so we could get the other instructors in the database.
We filter out the current instructor from the array at the beginning of 
the render function, and use this array to populate the dropdown menu
options. Because it's part of the form, we don't need to modify the 
handleSubmit function. On redirect to the CourseView we will see the 
updates.
You will see below the form there is another part of the UI that is
also changing the current course's instructor. This structure is similar
to how changing assigned courses is done in the InstrutcorView. There is
a slight drawback to using this approach in this context. When we perform
an EDIT_COURSE action (initiated by calling the editCourseThunk), this action
is sent to the allCourses reducer, not the course reducer. For that reason, 
we will not see the updates in the single course view unless there is another 
call to the fetchCourseThunk. This is done once when we redirect after form
submission, which is why the data is shown without needing to refresh. 
If we want that same functionality within the container, we need to make
a call to fetchCourse after each editCourse. We see that in the onClick
functionality of the buttons controlling that portion of the UI. 
*/

class EditTaskContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      due: "",
      employeeId: null,
      description: "",
      redirect: false,
      redirectId: null,
      error: ""
    };
  }

  componentDidMount() {
    //getting task ID from url
    this.props.fetchTask(this.props.match.params.id);
    this.props.fetchEmployees();
    this.setState({
      title: this.props.task.title,
      due: this.props.task.due,
      employeeId: this.props.task.employeeId,
      description: this.props.task.description,
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelectChange = event => {
    //handle change for the dropdown menu
    //want to set the instructorId based on the selected choice
    //when the form gets submitted, this is how we can change
    //assigned instructor without having to manually enter in the 
    //instructorId like before
    if (event.target.value === "staff") {
      this.setState({ employeeId: null });
    } else {
      this.setState({ employeeId: event.target.value })
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    //implementing form validation
    if (this.state.title === "") {
      this.setState({ error: "Error: this cannot be empty" });
      return;
    }

    //get new info for course from form input
    let task = {
      id: this.props.task.id,
      title: this.state.title,
      due: this.state.due,
      employeeId: this.state.employeeId,
      description: this.state.description,
    };

    this.props.editTask(task);

    this.setState({
      redirect: true,
      redirectId: this.props.task.id
    });

  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });

  }

  render() {
    let { task, allEmployees, editTask, fetchTask } = this.props;
    let assignedEmployee = task.employeeId;

    let otherEmployees = allEmployees.filter(employee => employee.id !== assignedEmployee);

    //go to single course view of the edited course
    if (this.state.navigate) {
      return (<Redirect to={`/task/${this.state.redirectId}`} />)
    }

    const myStyle={
      backgroundImage:`url(${process.env.PUBLIC_URL+ "/mount.jpg"})`,
              height:'100vh',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              };

    return (
      <div style={myStyle}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}> <h2>Submit after change! </h2>
        <div className="edit1">
          <form style={{ textAlign: 'center' }} onSubmit={(e) => this.handleSubmit(e)}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Title: </label>
            <input type="text" name="title" value={this.state.title || ''} placeholder={task.title} onChange={(e) => this.handleChange(e)} />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Due: </label>
            <input type="text" name="due" value={this.state.due || ''} placeholder={task.due} onChange={(e) => this.handleChange(e)} />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
            <input type="text" name="description" value={this.state.description || ''} placeholder={task.description} onChange={(e) => this.handleChange(e)} />
            <br />

            <select onChange={(e) => this.handleSelectChange(e)}>
              {task.employee !== null ?
                <option value={task.employeeId}>{task.employee.firstname + " (current)"}</option>
                : <option value="staff">Staff</option>
              }
              {otherEmployees.map(employee => {
                return (
                  <option value={employee.id} key={employee.id}>{employee.firstname}</option>
                )
              })}
              {task.employee !== null && <option value="staff">Staff</option>}
            </select>
            <br /><br />

            <button type="submit">
              Submit
            </button>

          </form>

          {this.state.error !== "" && <p>{this.state.error}</p>}

          <br />

          {task.employeeId !== null ?
            <div className='edit3'> Current employee:
              <Link to={`/employee/${task.employeeId}`}>{task.employee.firstname}</Link>

              <br></br>
              <br></br>

              <button onClick={async () => { await editTask({ id: task.id, employeeId: null }); fetchTask(task.id) }}>Unassign</button>

            </div>
            : <div> No employee currently assigned </div>
          }
          <br />

          <div> Other employees
            {otherEmployees.map(employee => {
              return (
                <div key={employee.id}>
                  <Link to={`/employee/${employee.id}`}>
                    <h4>{employee.firstname}</h4>
                  </Link>
                  <button onClick={async () => { await editTask({ id: task.id, employeeId: employee.id }); fetchTask(task.id) }}>Assign this employee</button>
                </div>
              )
            })
            }
          </div>

          <br />

          <Link to={`/task/${task.id}`}>
            <button>Back</button>
          </Link>

        </div>
      </div>
      </div>
    )
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
    allEmployees: state.allEmployees
  };
};

const mapDispatch = (dispatch) => {
  return ({
    editTask: (task) => dispatch(editTaskThunk(task)),
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),

  })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);