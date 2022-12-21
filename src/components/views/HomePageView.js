import { Link } from 'react-router-dom';



const HomePageView = () => {
  return (
    <div>
      <h3>Final Project</h3>
      <h6>Employee-Task Relationship</h6>
      <Link to={'/employees'}> 
        <button class="button button1">All Employees</button> 
      </Link>
      <br></br>
      <br></br>
      <Link to={'/tasks'} > 
        <button class = "button button2">All Tasks</button> 
      </Link>
      
    </div>
  );    
}




export default HomePageView;