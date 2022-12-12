import { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk } from '../../store/thunks';


class EditTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          title: "", 
          due: "",
          employeeId: null, 
          navigate: false, 
          navigateId: null
        };
    }

    componentDidMount() {
        //getting course ID from url
        this.props.fetchTask(this.props.match.params.id);
        this.setState({
            title: this.props.task.title, 
            due: this.props.task.due,
            employeeId: this.props.task.employeeId, 
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = event => {
        event.preventDefault();
        //get new info for course from form input
        let task = {
            id: this.props.task.id,
            title: this.state.title,
            due: this.state.due,
            employeeId: this.state.employeeId
        };
        
        this.props.editTask(task);

        this.setState({
          navigate: true, 
          navigateId: this.props.task.id
        });

    }

    componentWillUnmount() {
        this.setState({navigate: false, navigateId: null});
    }

    render() {
      //go to single course view of the edited course
        if(this.state.redirect) {
          return (<Navigate to={`/course/${this.state.navigateId}`}/>)
        }

        return (
            <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Title: </label>
            <input type="text" name="title" value={this.state.title} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>due: </label>
            <input type="text" name="due" value={this.state.due} onChange={(e) => this.handleChange(e)}/>
            <br/>
  
            <label style={{color:'#11153e', fontWeight: 'bold'}}>employeeId: </label>
            <input type="text" name="employeeId" value={this.state.employeeId} onChange={(e) => this.handleChange(e)} />
            <br/>
  
            <button type="submit">
              Submit
            </button>

          </form>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      task: state.task,
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editTask: (task) => dispatch(editTaskThunk(task)),
        fetchTask: (id) => dispatch(fetchTaskThunk(id)),

    })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);