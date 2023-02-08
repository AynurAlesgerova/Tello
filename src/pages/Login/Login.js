import React, { useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { authActions } from '../../redux/action/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

// scss
import './login.scss'

// icons
import signup from './icons/signup.svg'
import dots from './icons/Dot Grid.png'

const Login = () => {
  const [email, setEmail]= useState("")
  const {login} = authActions
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onsubmit = data => setEmail(data);

  useEffect(() => {
    if (email) {
    dispatch(login(email.email))
    // localStorage.setItem("islogin", true)
    navigate("/check-mail")
  }
},[dispatch, email, login, navigate])

  return (
    <div className='login-wrapper'>
        <div className='container'>
            <div className='login-block'>
                <div className='form-wrapper'>
                    <h2>Daxil ol</h2>
                    <div className='social-media'>
                      <div className='item'>
                        <div className='image'>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.1667 2.91667C14.1667 2.68667 13.9792 2.5 13.75 2.5H11.6667C9.365 2.5 7.5 4.17917 7.5 6.25V8.5H5.41667C5.18667 8.5 5 8.68667 5 8.91667V11.0833C5 11.3133 5.18667 11.5 5.41667 11.5H7.5V17.0833C7.5 17.3133 7.68667 17.5 7.91667 17.5H10.4167C10.6458 17.5 10.8333 17.3133 10.8333 17.0833V11.5H13.0158C13.2033 11.5 13.3675 11.375 13.4183 11.195L14.0192 9.02833C14.0933 8.76333 13.8933 8.5 13.6183 8.5H10.8333V6.25C10.8333 5.83583 11.2058 5.5 11.6667 5.5H13.75C13.9792 5.5 14.1667 5.31333 14.1667 5.08333V2.91667Z" fill="white"></path></svg>
                        </div>
                        <p>Facebook ilə</p>
                      </div>

                      <div className='item'>
                        <div className='image'>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.1667 2.91667C14.1667 2.68667 13.9792 2.5 13.75 2.5H11.6667C9.365 2.5 7.5 4.17917 7.5 6.25V8.5H5.41667C5.18667 8.5 5 8.68667 5 8.91667V11.0833C5 11.3133 5.18667 11.5 5.41667 11.5H7.5V17.0833C7.5 17.3133 7.68667 17.5 7.91667 17.5H10.4167C10.6458 17.5 10.8333 17.3133 10.8333 17.0833V11.5H13.0158C13.2033 11.5 13.3675 11.375 13.4183 11.195L14.0192 9.02833C14.0933 8.76333 13.8933 8.5 13.6183 8.5H10.8333V6.25C10.8333 5.83583 11.2058 5.5 11.6667 5.5H13.75C13.9792 5.5 14.1667 5.31333 14.1667 5.08333V2.91667Z" fill="white"></path></svg>
                        </div>
                        <p>Google ilə</p>
                      </div>
                    </div>
                    <div className='text'>və ya</div>
                    <div className='form'>
                      <form onSubmit={handleSubmit(onsubmit)}>
                        <label>E-mail</label>
                        <input {...register("email", {required:"Email ünvanıızı daxil edin!",minLength: {value:8, message: "Invalid Email Format"}})} placeholder="nümunə@gmail.com" />
                        <p style={{color:"red"}}>{errors.email?.message}</p>
                        <button  type='submit' className='login-btn' >Daxil ol</button>
                      </form>
                    </div>

                </div>  
                <div className='image-wrapper'>
                  <div className='img'>
                    <img src={signup} alt="signup"/>
                  </div>
                  
                  
                  <span>Hesabınız yoxdur? <Link to={"/signup"}><span style={{color: "#2D9CDB"}}>Qeydiyyatdan keçin</span> </Link> </span>
                  <div className='dots'>
                    <img src={dots}/>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login