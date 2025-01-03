import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import crud_logo from '/crud_logo.png';
import { toast } from 'react-toastify';
import {UnprotectedAPI} from '../../../../config/axiosConfig';

const SignUp = () => {


  const [formData, setFormData] = useState({ name: "", email: "", password: "", mobile: "" });
  const [formError, setFormError] = useState({ name: "", email: "", password: "", mobile: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value.trim()
    });
  }

  console.log(formData)

  const validate = () => {
    let errors = {};
    let valid = true;

    if (!formData.name) {
      errors.name = "Username is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    } else {
      if (formData.password.length < 6) {
        errors.password = 'Min 6 characters'
        valid = false;
      }
      if (!/[A-Za-z]/.test(formData.password)) {
        errors.password = 'At least 1 letter'
        valid = false;
      }
      if (!/\d/.test(formData.password)) {
        errors.password = 'At least 1 number'
        valid = false;
      }
      // if (!/[@$!%*?&]/.test(formData.password)) {
      //   errors.password = 'At least 1 special character'
      //   valid = false;
      // }
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
      valid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits long";
      valid = false;
    }

    setFormError(errors);
    return valid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        
        const response = await UnprotectedAPI.post('/user/register', formData);
        if(response.data.success){
          toast.success('Registration Successful');
          console.log('Registration Successful!');
          console.log(response.data)
          navigate('/login');
        }else{
          toast.error('Something went wrong!');
        }

      } catch (error) {
        console.error('Error submitting form', error);
        setFormError({ ...formError, submit: 'An error occurred!' });

      }
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };


  return (
    <div className='signup'>
      <img src={crud_logo} width={95} height={80} alt="" />
      <div className='signup-form'>

        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit} >

          <input type="text" name='name' value={formData.name} placeholder='Username' onChange={handleChange} />
          {formError.name && <p className="error">{formError.name}</p>}

          <input type="email" name='email' value={formData.email} placeholder='Email address' onChange={handleChange} />
          {formError.email && <p className="error">{formError.email}</p>}

          <input type="text" name='mobile' value={formData.mobile} placeholder='Mobile' onChange={handleChange} />
          {formError.mobile && <p className="error">{formError.mobile}</p>}

          <input type="password" name='password' value={formData.password} placeholder='Password' onChange={handleChange} />
          {formError.password && <p className="error">{formError.password}</p>}

          {/* <div className='file-input-container'>
            <input type="file" id="file-input" className="file-input" />
            <label htmlFor="file-input" className="upload-img-btn">Upload Profile</label>
          </div> */}

          <button type='submit'>Sign Up</button>
        </form>

        <div className='form-switch'>
          <p>Already have an account? <span onClick={navigateToLogin}>Sign In Now</span></p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
