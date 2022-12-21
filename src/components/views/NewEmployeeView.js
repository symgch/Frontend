//import { Link } from "react-router-dom";

const NewEmployeeView = (props) => {
    const {handleChange, handleSubmit, error } = props;
  
    return (
      <div className="root">
        <div className="formContainer">
          <div className="formTitle">
            <h2 style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              New Employee
            </h2>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Firstname: </label>
            <input type="text" name="firstname" onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>

            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Lastname: </label>
            <input type="text" name="lastname" onChange ={(e) => handleChange(e)} />
            <br/>
            <br/>
  
            <label style={{color:'#11153e', fontWeight: 'bold'}}>Department: </label>
            <input type="text" name="department" onChange={(e) => handleChange(e)} />
            <br/>
            <br/>
  
  {/*do we generate one?*/}
            {/* <label style={{color:'#11153e', fontWeight: 'bold'}}>employeeId: </label>
            <input type="text" name="employeeId" onChange={(e) => handleChange(e)} />
            <br/>
            <br/> */}
  
            <button type="submit">
              Submit
            </button>
            <br/>
            <br/>
          </form>
          {error!=="" && <p>{error}</p>}
          </div>
        </div>
      
    )
  }
  
  export default NewEmployeeView;