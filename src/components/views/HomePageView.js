import { Link } from 'react-router-dom';
import './home.css'

const HomePageView = () => {
  return (
    <div>
      <div className="Background1">
      <br>
      </br>
      <h1 style={{color:'white', fontStyle: 'italic'}}>Final Project</h1>
      <h6>Employee-Task Relationship</h6>
      <Link to={'/employees'}> 
        <button style={{backgroundImage:"url('/laptop.jpg')",backgroundSize:"cover", width:"300px", height:"200px", color:'whitesmoke', fontWeight: 'bold', fontSize:'20px',}}>
          Employees
        </button> 
      </Link>
      <br></br>
      <br></br>
      <Link to={'/tasks'} > 
        <button style={{backgroundImage:"url('/note.jpg')",backgroundSize:"cover", width:"300px", height:"200px", color:'whitesmoke', fontWeight: 'bold', fontSize:'20px',}}>
          All Tasks
        </button> 
      </Link>
      </div>
    </div>
  );    
}




export default HomePageView;