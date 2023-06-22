// Signup.js
import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [nameUser, setnameUser] = useState(false);
  const [emailUser, setemailUser] = useState(false);
  const [numberUser, setnumberUser] = useState(false);

  const [errors, setErrors] = useState('');

  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  }

  const validateNumber = (number) => {
    return (number.length === 10)
  }

  const validate = () => {
    axios.get(`http://localhost:8080/signup/all`).then((respo) => {
      const responseData = respo.data;
      const enteredUsername = username; // Replace with the username entered by the user
      const enteredEmail = email;
      const enteredNumber = number;

      const valid_name = responseData.find((user) => user.username === enteredUsername);
      const valid_email = responseData.find((user) => user.email === enteredEmail);
      const valid_number = responseData.find((user) => user.number === '+91'+enteredNumber);

      console.log(valid_name);
      console.log(valid_email);
      console.log(valid_number);

      if (valid_name){
        setnameUser(true);
      }
      else{
        setnameUser(false);
      }
      if (valid_email){
        setemailUser(true);
      }
      else{
        setemailUser(false);
      }
      if (valid_number){
        setnumberUser(true);
      }
      else{
        setnumberUser(false);
      }

    })
  .catch((error) => {
    console.error('Axios error:', error);
  });
  ////
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      setnameUser(false);
      setemailUser(false);
      setnumberUser(false);

      validate();
      
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
        // setErrors({ password: 'Enter 8 characters minimum' });
        return;
      }

      if (password !== confirmPassword) {
        alert('passwords donot match');
        // setErrors({ confirmPassword: 'Passwords do not match' });
        return;
      }

      if (!email) {
        alert('Email is required');
        return;
      }

      if (validateEmail(email)) {
        // console.log("Email is valid");
      } else {
        console.log("Email is not valid");
        // setErrors({ email: 'enter a valid email' });
        alert('Enter a valid email i.d');
        return;
      }

      if (!number) {
        alert('Phone Number is required');
        return;
      }

      // if (!Number.isInteger(number)){
      //   alert('Enter a valid Phone Number');
      // }
      
      // if (Number.isInteger(parseInt(number))){
      //   console.log("Phone Number is Valid");
      //   }
      //   else{
      //     console.log("Phone Number is not Valid");
      //     alert('not a number');
      //     return;
      //   }

      if (validateNumber(number) && Number.isInteger(parseInt(number))){
      // console.log("Phone Number is Valid");
      }
      else{
        console.log("Phone Number is not Valid");
        alert('enter a valid 10-digit Phone Number');
        return;
      }

      ////
      console.log(nameUser);
      console.log(emailUser);
      console.log(numberUser);
      if (nameUser){
        alert("Username already exists, enter a new username");
        return;
      }

      else if (emailUser){
        alert("Email already exists, enter a new email");
        return;
      }

      else if (numberUser){
        alert("Number already exists, enter a new phone number");
        return;
      }
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
        // history.push('/login'); // Navigate to Login page
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // console.log('hello');
    // Reset form fields and errors
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
    setNumber('');
    
    setErrors({});
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
        {errors.username && (
          <span className="error" style={{ paddingLeft: '10px' }}>
            {errors.username}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '14px' }}>Password:</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="error" style={{ paddingLeft: '10px' }}>
            {errors.password}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Confirm Password:</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <span className="error" style={{ paddingLeft: '10px' }}>
            {errors.confirmPassword}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="error" style={{ paddingLeft: '10px' }}>
            {errors.email}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label style={{ width: '120px', paddingRight: '20px' }}>Phone Number:</label>
        <input
          type="text"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        {errors.number && (
          <span className="error" style={{ paddingLeft: '10px' }}>
            {errors.number}
          </span>
        )}
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
