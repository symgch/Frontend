import { Link } from 'react-router-dom';


const HomePageView = () => {
  const myStyle={
    backgroundImage:`url(${process.env.PUBLIC_URL+ "/sky.jpg"})`
            ,height:'100vh',
            marginTop:'-10px',
            fontSize:'30px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            };

  return (
    <div>
      <div style={myStyle}>
      <br>
      </br>
      <h3 style={{color:'white', fontStyle: 'italic'}}>Final Project</h3>
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