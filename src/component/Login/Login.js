import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import logo from '../../Images/logo2.png';
import './Login.css';
import Auth from './userAuth';

const Login = () => {
    const auth = Auth();
    const [registeredUser,setRegisteredUser] = useState(false);
    const { register,  errors } = useForm()
    
    //user setup
    const [user,setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        photo: '',
        existingUser: false,
        isValid: false,
      });

      

      //Form validation
        const formValidation = e => /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e);

        const handleChange = e =>{
        //Get All properties of user
        const newUserInfo = {
          ...user
        }
        //Perform validation
        let isValid = true;
        if (e.target.name === 'email') {
          isValid = formValidation(e.target.value);
        }
        if (e.target.name === 'password') {
          isValid = e.target.value.length > 8;
        }
        newUserInfo[e.target.name] = e.target.value;
        newUserInfo.isValid = isValid;
        setUser(newUserInfo);
        console.log(user,"before signup")
      }

    //Handle Signup
    const handleSignUp = (event) => {
        if (user.isValid) {
            auth.signUp(user)
            .then(response => {
              window.location.pathname = '/shop';
            })
            }else{
            console.log("Form is not valid.");
          }
          event.preventDefault();
          event.target.reset();
        
    }

    // Handle sign in
    const handleSignIn = (event) => {
      if (user.isValid) {
        auth.signIn(user)
        .then(response => {
          window.location.pathname = '/shop';
        })
      }
      event.preventDefault();
    }


    const returningUser = () => {
      if (registeredUser === false) {
        setRegisteredUser(true)
      }else if (registeredUser === true) {
        setRegisteredUser(false)
      }
    }


    
    return (
        <div className="signup-form">
            <div className="container">
                <img src={logo} alt=""/>
                {
                  registeredUser ? 

                  <form onSubmit={handleSignIn} className="d-flex align-items-center flex-column">

                    <input name="email" onBlur={handleChange} ref={register({ required: true })} placeholder="Email" />
                    {errors.email && <span>This field is required</span>}

                    <input name="password" onBlur={handleChange} ref={register({ required: true })} placeholder="Password" />
                    {errors.password && <span>This field is required</span>}

                    
                    <button type="submit" className="submit-button">Sign In</button>
                    <span onClick={returningUser} className="returning-user">Create an account</span><br/>
                  </form>
                  
                    :

                    <form onSubmit={handleSignUp} className="d-flex align-items-center flex-column" >
                
                    <input name="name" onBlur={handleChange} ref={register({ required: true })} placeholder="Name" />
                    {errors.name && <span>This field is required</span>}

                    <input name="email" onBlur={handleChange} ref={register({ required: true })} placeholder="Email" />
                    {errors.email && <span>This field is required</span>}

                    <input name="password" onBlur={handleChange} ref={register({ required: true })} placeholder="Password" />
                    {errors.password && <span>This field is required</span>}

                    <input name="confirm_password" onBlur={handleChange} ref={register({ required: true })} placeholder="Confirm Password" />
                    {errors.confirm_password && <span>This field is required</span>}
                    
                    <button type="submit" className="submit-button">Signup</button>

                    <span onClick={returningUser} className="returning-user">Already have an account</span><br/>
                </form>
                }
            </div>
        </div>
    );
};

export default Login;