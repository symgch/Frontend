import { Link } from "react-router-dom";
import './home.css'

const NewTaskView = (props) => {
  const { handleChange, handleSubmit, error } = props;

  return (
    <div className="back">
      <div className="root">
        <div className="formContainer">
          <div className="formTitle">
            <h2 style={{ fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '50px', color: 'white' }}>
              New Task
            </h2>
            <h5 style={{ color: 'black' }}>
              Please fill in all section with '*'
            </h5>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Title*: </label>
            <input type="text" name="title" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Due*: </label>
            <input type="text" name="due" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>employeeId: </label>
            <input type="text" name="employeeId" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>description: </label>
            <input type="text" name="description" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <button type='submit'> Submit </button>

            <br />
            <br />

            <Link to={'/tasks'} >
              <button>Back</button>
            </Link>
          </form>
          {error !== "" && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default NewTaskView;