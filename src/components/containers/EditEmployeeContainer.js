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
        if (this.state.firstname === "") {
          this.setState({error: "Error: This cannot be empty"});
          return;
        }

        //get new info for course from form input
        let employee = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department,
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
      let { employee } = this.props;

      //go to single course view of the edited course
      if (this.state.navigate) {
        return (<Redirect to={`/employees/${this.state.redirectId}`} />)
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
            <input type="text" name="department" value={this.state.department || ''} placeholder={employee.department} onChange={(e) => this.handleChange(e)}/>
            <br/>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          <br />

          <h1> Does not work </h1>

          <br />

          <Link to={`/employee/${employee.id}`}>
            <button>Back</button>
          </Link>

        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      employee: state.employee,
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
    
  };

export default connect(mapState, mapDispatch)(EditEmployeeContainer);