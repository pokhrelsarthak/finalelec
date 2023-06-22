import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Otp() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [valuee, setValuee] = useState('');
    const [otp, setOtp] = useState('');
    const [show,setShow] = useState(false);
    const [errors, setErrors] = useState('');
    const [showOtp,setShowOtp] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isNumber, setIsNumber] = useState(false);
    // const [validpass, setValidPass] = useState(false);
    // const history = useHistory();
    
    const handleSubmit1 = (event) => {
        event.preventDefault();
        if (!valuee) {
            setErrors({ valuee: 'An Email or Phone Number is required' });
            return;
        }
        
        axios.get(`http://localhost:8080/signup/all`).then((respo) => {
          const responseData = respo.data;
          const enteredvalue = valuee;
          console.log(enteredvalue);

          // Find the user object with the entered username
          const emailUser = responseData.find((user) => user.email === enteredvalue);
          console.log(emailUser);

          const numberUser = responseData.find((user) => user.number === enteredvalue);
          console.log(numberUser);

          if (emailUser) {
            console.log('valid Email');
            const onlyEmail = {
              email: valuee,
            };
            setShowOtp(true);
            setIsEmail(true);
            setIsNumber(false);
            axios.put('http://localhost:8080/signup/otp', onlyEmail)
              .then(response => {
                  console.log('Response:', response.data);
              })
              .catch(error => {
                  console.error('Error is:', error);
              });
            } else if (numberUser) {
              console.log('valid Number');
              const onlyNumber = {
                number: valuee,
              };
              setShowOtp(true);
              setIsEmail(false);
              setIsNumber(true);
              axios.put('http://localhost:8080/signup/otpsms', onlyNumber)
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error is:', error);
                });
              } else {
                console.log('Credential not found!');
                setShowOtp(false);
                alert('Enter correct Email or Phone Number');
                return;
              }
            // console.log('Email not found!');
            // alert('Enter correct Email');
            // return;
            })
          .catch((error) => {
            console.error('Axios error:', error);
          });

        // setShowOtp(true);
        setErrors({});
        return;
    };

    
    const handleSubmit2 = (event) => {
      console.log("coming to handlesubmit2");
        if (!password) {
            alert('password is required');
            return;
            }
        
        if (password.length < 7){
          alert('enter password of length 8 characters minimum');
          // setErrors({ password: 'Enter 8 characters minimum' });
          return;
        }

        if (password !== confirmPassword) {
          alert('passwords do not match');
          return;
        }

        if (isEmail){
          const passCredentials = {
            email: valuee,
            password: password,
            };
        
            axios.post('http://localhost:8080/signup/changepassword', passCredentials)
            .then(response => {
                console.log('Response is:', response.data);
                alert('Password Successfully Changed');
                window.location.href='/login'
                // setValidPass(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setPassword('');
            setConfirmPassword('');
            setErrors({});
        }
        else if (isNumber){
          const passCredentials2 = {
            number: valuee,
            password: password,
            };
        
            axios.post('http://localhost:8080/signup/changepassword2', passCredentials2)
            .then(response => {
                console.log('Response is:', response.data);
                alert('Password Successfully Changed');
                window.location.href='/login'
                // setValidPass(true);
            })
            .catch(error => {
                console.error('Error:', error);
            });
            setPassword('');
            setConfirmPassword('');
            setErrors({});
        }
    };

    const handleSubmit3 = (event) => {
      if (!otp) {
          setErrors({ otp: 'OTP is required' });
          return;
          }
      if (isEmail){
        const emailRequest = {
          email: valuee,
          otp: otp,
          };
          console.log(emailRequest);
          axios
          .post('http://localhost:8080/signup/verify', emailRequest)
          .then(response => {
              console.log('Response is:', response.data);
              if (response.data === 'Successfully verified'){
                setShow(true);
                console.log('valid otp');
              }
              else if (response.data === 'You have entered the wrong OTP'){
                setErrors({ otp: 'Enter the correct OTP' });
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
        setOtp('');
        setErrors({});
      }
      else if (isNumber){
        const numberRequest = {
          number: valuee,
          otp: otp,
          };
          console.log(numberRequest);
          axios
          .post('http://localhost:8080/signup/verify2', numberRequest)
          .then(response => {
              console.log('Response is:', response.data);
              if (response.data === 'Successfully verified'){
                setShow(true);
                console.log('valid otp');
              }
              else if (response.data === 'You have entered the wrong OTP'){
                setErrors({ otp: 'Enter the correct OTP' });
              }
          })
          .catch(error => {
              console.error('Error:', error);
          });
        setOtp('');
        setErrors({});
      }
  };
    
        // const signupData = {
        // password: password,
        // email: email,
        // };
    
        // axios
        // .post('http://localhost:8080/signup/save', signupData)
        // .then(response => {
        //     console.log('Response:', response.data);
        //     alert('User Added');
        //     history.push('/login'); // Navigate to Login page
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
    
        // Reset form fields and errors
        // setPassword('');
        // setEmail('');
        // setConfirmPassword('');
    
        // setErrors({});
  return (
    <>
    <div style={{ marginTop: '30px' }}>
      <center>
        {/* <h2>Enter otp</h2> */}
          {show ? (
            <>
            <h2>Change Password</h2>
            <form>
            <div>
            <label style={{ position: 'relative', paddingRight: '10px' }}>New Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error" style={{ position: 'fixed', marginTop: '9px', paddingLeft: '10px' }}>
                {errors.password}
              </span>
            )}
          </div>
          <div>
            <label style={{ position: 'relative', paddingRight: '20px' }}>Confirm New Password:</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ position: 'relative', marginLeft: '0px', paddingRight: '0px' }}
            />
            {errors.confirmPassword && (
              <span className="error" style={{ position: 'fixed', marginTop: '9px', paddingLeft: '10px' }}>
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <center>
            {/* {validpass ? (
              <Link to="/login">
              <button onClick={handleSubmit2} type="submit" className="btn btn-success">
                  Submit
              </button>
              </Link>
            ):( */}
            <button onClick={handleSubmit2} type="submit" className="btn btn-success">
                Submit
            </button>
            {/* )} */}
          </center>
          </form>
          </>
          ):(
          <>
          {showOtp?(
            <>
               <h2>Enter OTP</h2>
          <form>
          <div>
            <label style={{ position: 'relative', paddingRight: '20px' }}>Enter OTP:</label>
            <input
              type="text"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{ position: 'relative', marginLeft: '0px', paddingRight: '0px' }}
            />
            {errors.otp && (
              <span className="error" style={{ position: 'fixed', marginTop: '9px', paddingLeft: '10px' }}>
                {errors.otp}
              </span>
            )}
          </div>
          <center>
          <button onClick={handleSubmit3} type="submit" className="btn btn-success">
            Submit
          </button>
        </center>
        </form>
            </>
          ):(
            <>
            <h2>Enter your Email / Phone Number</h2>
          <form>
          <div>
            <label style={{ position: 'relative', paddingRight: '20px' }}>Enter Email or Phone Number:</label>
            <input
              type="text"
              required
              value={valuee}
              onChange={(e) => setValuee(e.target.value)}
              style={{ position: 'relative', marginLeft: '0px', paddingRight: '0px' }}
            />
            {errors.valuee && (
              <span className="error" style={{ position: 'fixed', marginTop: '9px', paddingLeft: '10px' }}>
                {errors.valuee}
              </span>
            )}
          </div>
          <center>
          <button onClick={handleSubmit1} type="submit" className="btn btn-success">
            Send OTP
          </button>
        </center>
        </form>
        </>
          )}
        </>)}
      </center>
    </div>
    </>
  )
}
