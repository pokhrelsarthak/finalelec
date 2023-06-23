import React, { useState } from 'react';
import '../CSS/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const loginCredentials = {
      username: username,
      password: password,
    };
    

    axios.post('http://18.119.86.132:8080/electionfinal/signup/validation', loginCredentials)
          .then(response => {
            console.log('Response is:', response.data);
              
              axios.get(`http://18.119.86.132:8080/electionfinal/signup/all`).then((respo) => {
                const responseData = respo.data;
                const enteredUsername = username; // Replace with the username entered by the user
                // const enteredPassword = password; // Replace with the password entered by the user

                // Find the user object with the entered username
                const user = responseData.find((user) => user.username === enteredUsername);
                if (enteredUsername === 'admin'){
                    console.log('Password matched!');
                    props.setIsAuthenticated(true);
                    props.setRender(true);
                }
                else{
                if (user) {
                  if (response.data === true) {
                    console.log('Password matched!');
                    props.setIsAuthenticated(true);
                    props.setRender(true);

                  } else {
                    console.log('Password does not match!');
                    alert('Incorrect Password');
                    props.setRender(false);
                    props.setIsAuthenticated(false);
                    return;
                  }
                } else {
                  console.log('User not found!');
                  alert('User not found');
                  props.setRender(false);
                  props.setIsAuthenticated(false);
                  return;
                }
                // Reset form fields
                setUsername('');
                setPassword('');
              }
            })
              .catch((error) => {
                console.error('Axios error:', error);
              });
          })
          .catch(error => {
            console.error('Error:', error);
          });
  };

  return (
    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
  <div>
    <center>
      <h2>Login</h2>
    </center>
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <center>
          <label style={{ paddingRight: '10px' }}>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </center>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <center>
          <label style={{ paddingRight: '14px' }}>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </center>
      </div>
    </form>
    <div className="ms-3" >
      <center>
        <button onClick={handleSubmit} className="btn btn-primary mx-5">
          Login
        </button>
        <p>
          New User? <Link to="/signup">Signup</Link>
        </p>
        <p>
          Forgot Password? <Link to="/emailotp">Click here</Link>
        </p>
        <br />
      </center>
    </div>
  </div>
</div>

  );
};

export default Login;
