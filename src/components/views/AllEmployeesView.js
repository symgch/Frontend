import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  let {allEmployees, deleteEmployee} = props;
  if (!props.allEmployees.length) {
    return (
    <div>
      <p>There are no employees.</p>
      <Link to={`/newemployee`}>
        <button>Add New Employee</button>
      </Link>
    </div>
    );
  }

  return (
    <div>
      {allEmployees.map((employee) => {
        let name = employee.firstname + " " + employee.lastname;
        return (
          <div key={employee.id}>
          <Link to={`/employee/${employee.id}`}>
            <h1>{name}</h1>
          </Link>
          <p>{employee.department}</p>
          <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
        </div>
        );

      })}

      <br>
      </br>

      <Link to={`/newEmployee`}>
        <button>Add New Employee</button>
      </Link>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  
};

export default AllEmployeesView; 