import { Link } from "react-router-dom";

const NewEmployeeView = (props) => {
  const { handleChange, handleSubmit, error } = props;

  return (
    <div className="back2">
      <div className="root">
        <div className="formContainer">
          <div className="formTitle">
            <h2 style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '50px', color: 'black' }}>
              New Employee
            </h2>
          </div>
          <form style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} onSubmit={(e) => handleSubmit(e)}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Firstname: </label>
            <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Lastname: </label>
            <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Department: </label>
            <input type="text" name="department" onChange={(e) => handleChange(e)} />
            <br />
            <br />

            <Link to={'/employees'} >
              <button>Back</button>
            </Link>

            <button type="submit">
              Submit
            </button>
            <br />
            <br />
          </form>
          {error !== "" && <p>{error}</p>}
        </div>
      </div>
    </div>
  )
}

export default NewEmployeeView;