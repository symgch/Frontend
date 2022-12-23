import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task } = props;

  const myStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/build.jpg"})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={myStyle}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="edit2">
          <h1 style={{ fontFamily: 'Courier, sans-serif' }}>{task.title}</h1>
          {task.employee ? <h3>{task.employee.firstname + " " + task.employee.lastname}</h3> : <h3>staff</h3>}
          <h5>{task.description}</h5>
          <Link to={`/edittask/${task.id}`}>
            <button>Edit task information</button>
          </Link>
          <br />
          <Link to={`/tasks`}>
            <button>View all tasks</button>
          </Link>
        </div>
      </div>
    </div>
  );

};

export default TaskView;