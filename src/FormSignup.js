import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import zxcvbn from "zxcvbn";

const eye = <FontAwesomeIcon icon={faEye} />;



const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );
  const [passwordShown, setPasswordShown] = useState(false);
  
 
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    
  };

  const testResult = zxcvbn(values.password)
  const num =testResult.score * 100/4

  const passwordLevel = () =>{
    switch(num)
    {        
      case 0:
        return  'Very Weak';

      case 25:
        return 'Weak';
       
      case 50:
        return 'Fair';
        
      case 75:
        return 'Strong';
       
      case 100:
        return 'Very Strong';
        
      default :
        return ''
        
    }
  }


  const barColor = () => {
    console.log("test result score is ",num)
    switch (num)
    {
      case 0:
        return 'red' ;
       
        
      case 25:
        return 'blue';
        

      case 50:
        return 'yellow';
        

      case 75:
        return 'purple';
        

      case 100:
        return 'green';
        

      default :
        return ''
        
    }
  }
  const changeColor = () =>({
    width :`${num}%`,
    color: barColor(),
    height :'5px',

  })
  

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form'>
        <h1>
          Let's get started !
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          
          <input
            className='form-input'
            type={passwordShown ? "text" : "password"}
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
            
          />
          <progress value={num} max={num} style={changeColor() }> </progress>

          <div id="main">
         <p style={{color : barColor()}  }> {passwordLevel()} </p>
         </div>
          {passwordShown ? <i onClick={togglePasswordVisiblity}>{eye}</i> : <i class="fas fa-eye-slash" onClick={togglePasswordVisiblity}></i>} 


          {errors.password && <p>{errors.password}</p>}
        </div>
       

        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
          
        </div>

       


        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
        <span className='form-input-login'>
          Already have an account? Login <a href='#'>here</a>
        </span>
      </form>
    </div>
  );
};

export default FormSignup;
