// Signup.js
import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const history = useHistory();

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  const validateNumber = (number) => {
    return (number.length === 10)
  }

  const post = () => {
    const signupData = {
      username: username,
      password: password,
      email: email,
      number: '+91'+number,
    };
  
    axios
      .post('http://localhost:8080/signup/save', signupData)
      .then(response => {
        // console.log('Response:', response.data);
        alert('User Added');
        // window.location.href = '/';
        history.push('/');
        // history.push('/login'); // Navigate to Login page
      })
      .catch(error => {
        console.error('Error:', error);
      });


    // Reset form fields 
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    setNumber('');

  }

  const handleSubmit = (event) => {

      event.preventDefault();

      axios.get(`http://localhost:8080/signup/all`).then((respo) => {
          const responseData = respo.data;
          const enteredUsername = username; // Replace with the username entered by the user
          const enteredEmail = email;
          const enteredNumber = number;

          const is_user = responseData.find((user) => user.username === enteredUsername);
          const is_existing_email = responseData.find((user) => user.email === enteredEmail);
          const is_existing_number = responseData.find((user) => user.number === '+91'+enteredNumber);


          if (is_user){
            console.log('Username already exists');
          }

          if (is_existing_email){
            console.log('Email already exists');
          }

          if (is_existing_number){
            console.log('Number already exists');
          }

      if (!username) {
        alert('Username is required');
        return;
      }
      if (!password) {
        alert('Password is required');
        return;
      }

      if (password.length < 8){
        alert('enter password of length 8 characters minimum');
        return;
      }

      if (password !== confirmPassword) {
        alert('passwords donot match');
        return;
      }

      if (!email) {
        alert('Email is required');
        return;
      }

      if (validateEmail(email)) {
      } else {
        alert('Enter a valid email i.d');
        return;
      }

      if (!number) {
        alert('Phone Number is required');
        return;
      }

      if (!(validateNumber(number) && Number.isInteger(parseInt(number)))){
        console.log("Phone Number is not Valid");
        alert('enter a valid 10-digit Phone Number');
        return;
      }

      if (is_user !== undefined){
        setUsername('');
        alert("Username already exists, enter a new username");
        return;
      }
      if (is_existing_email !== undefined){
        setEmail('');
        alert("Email already exists, enter a new Email");
        return;
      }
      if (is_existing_number !== undefined){
        setNumber('');
        alert("Phone number already exists, enter a new phone number");
        return;
      }

      // posting details into the database after all the above validations are satisfied.
      post();

      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  return (
    <div style={{ marginTop: '30px',display: 'flex',justifyContent:'center' }}>
  <center>
    <h2>Sign Up</h2>
    <form>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '10px' }}>Username:</label>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '14px' }}>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Confirm Password:</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Phone Number:</label>
        <input
          type="text"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <center>
        <button onClick={handleSubmit} type="submit" className="btn btn-success">
          Submit
        </button>
      </center>
    </form>
    <p>
      Already have an account? <Link to="/">Login</Link>
    </p>
  </center>
</div>

  );
};

export default Signup;
