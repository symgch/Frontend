import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { BrowserRouter as Redirect, Link } from 'react-router-dom';

import { fetchEmployeeThunk, editEmployeeThunk, } from '../../store/thunks';


class EditEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "",
          department: "",
          taskId: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting employee ID from url
        this.props.fetchEmployee(this.props.match.params.id);
        this.setState({
            firstname: this.props.employee.firstname, 
            lastname: this.props.employee.lastname, 
            department: this.props.employee.department, 
            taskId: this.state.taskId
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.firstname === "") {
          this.setState({error: "Error: title cannot be empty"});
          return;
        }

        //get new info for course from form input
        let employee = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department,
            taskId: this.state.taskId
        };
        
        this.props.editEmployee(employee);

        this.setState({
          redirect: true, 
          redirectId: this.props.employee.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { employee, editEmployee, } = this.props;
      
        //go to single course view of the edited course
        if(this.state.navigate) {
          return (<Redirect to={`/employee/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Firstname: </label>
            <input type="text" name="firstname" value={this.state.firstname || ''} placeholder={employee.firstname} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Lastname: </label>
            <input type="text" name="lastname" value={this.state.lastname || ''} placeholder={employee.lastname} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Department: </label>
            <input type="text" name="deparment" value={this.state.department || ''} placeholder={employee.department} onChange={(e) => this.handleChange(e)}/>
            <br/>

            {/* <select onChange={(e) => this.handleSelectChange(e)}>
              {employee.task!==null ?
                <option value={employee.taskId}>{employee.task.title+" (current)"}</option>
              : <option value="due">Due</option>
              }
              {otherTasks.map(task => {
                return (
                  <option value={task.id} key={task.id}>{task.title}</option>
                )
              })}
              {employee.task!==null && <option value="due">Due</option>}
            </select> */}
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {employee.taskId !== null ?
            <div> Current Tasks:  
            <Link to={`/task/${employee.taskId}`}>{employee.task.title}</Link>
            <button onClick={async () => {await editEmployee({id:employee.id, taskId: null}); }}>Unassign</button>
            </div>
            : <div> No Tasks currently assigned </div>
          }

        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      employee: state.employee,
      allTasks: state.allTasks
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),

    })
}

EditEmployeeContainer.propTypes = {
    fetchEmployee: PropTypes.func.isRequired,
    editEmployee: PropTypes.func.isRequired,
    fetchAllTasks: PropTypes.func.isRequired,
    
  };

export default connect(mapState, mapDispatch)(EditEmployeeContainer);