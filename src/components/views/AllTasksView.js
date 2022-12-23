import './home.css'
import { Link } from "react-router-dom";

const AllTasksView = (props) => {
  let { tasks, deleteTask } = props;
  //courses = [{id: 300, title: "hello"}]
  if (!tasks.length) {
    return (
      <div>
        <p>There are no tasks.</p>
        <Link to={`/newtask`}>
          <button>Add New Task</button>
        </Link>
      </div>
    );
  }

  return (
    <div className='Background'>
      <h1 className='title'>List of Tasks</h1>

      {tasks.map((task) => {
        let title = task.title;
        let due = task.due;
        return (
          <table>
            <thead>
              <tr>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <div key={task.id}>
                  <td>
                    <Link to={`/task/${task.id}`}>
                      <h1>{title}</h1>
                    </Link>
                  </td>
                  <td>
                    <h2>{due}</h2>
                  </td>
                  <td>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
        );
      }
      )} 

      <br>
      </br>
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
      <br>
      </br>
      <br>
      </br>
      <Link to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
};


export default AllTasksView;