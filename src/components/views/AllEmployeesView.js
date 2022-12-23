import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './home.css'

const AllEmployeesView = (props) => {
  let { allEmployees, deleteEmployee } = props;
  if (!props.allEmployees.length) {
    return (
      <div>
        <p>There are no employees.</p>
        <Link to={`/newEmployee`}>
          <button>Add New Employee</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="Background2">
      {allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
            <table className="table2">            
              <Link to={`/employee/${employee.id}`}>
                <h1>{name}</h1>
              </Link>
              <h3>{employee.department}</h3>
              <button onClick={() => deleteEmployee(employee.id)}>Delete</button>             
            </table>
          </div>
        );

      })}

      <br>
      </br>

      <Link to={`/newEmployee`}>
        <button>Add New Employee</button>
      </Link>
      <br></br>
      <br></br>

      <Link to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired,

};

export default AllEmployeesView; 