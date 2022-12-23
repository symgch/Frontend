import { Link } from "react-router-dom";


const EmployeeView = (props) => {
  const { employee, editTask, allTasks } = props;
  let assignedTasks = allTasks.filter(task => task.employeeId === employee.id);
  let availableTasks = allTasks.filter(task => task.employeeId !== employee.id);

  const myStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/last.jpg"})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={myStyle}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
    <div className="edit1">
      <h1 style={{fontFamily: 'Courier, sans-serif'}}>{employee.firstname + " " + employee.lastname}</h1>
      <h3>{employee.department}</h3>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <div>Assigned tasks:
          {assignedTasks.map(task => {
            return (
              <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.title}</h4>
                </Link>
                <button onClick={() => editTask({ id: task.id, employeeId: null })}>x</button>
              </div>
            );
          })}</div>
        <div>Available tasks:
          {availableTasks.map(task => {
            return (
              <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.title}</h4>
                </Link>
                <button onClick={() => editTask({ id: task.id, employeeId: employee.id })}>+</button>
              </div>
            );
          })}</div>

      </div>
      <Link to={`/editemployee/${employee.id}`}>
        <button>Edit Employee information</button>
      </Link>
      <br />
      <Link to={`/employees`}>
        <button>View all Employees</button>
      </Link>

    </div>
    </div>
    </div>
  );

};

export default EmployeeView;