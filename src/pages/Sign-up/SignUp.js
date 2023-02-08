import React, { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../redux/action/auth'
// scss
import './signUp.scss'
// icons
import signup from './signup.svg'
import dots from './Dot Grid.png'

const SignUp = () => {
  const {createCustomer} = authActions
  const dispatch = useDispatch()
  const [info, setInfo]= useState("")
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => setInfo(data);
  const navigate= useNavigate()

  useEffect(() => {
      if (info) {
      dispatch(createCustomer(info))
      navigate("/login")
    }
  },[createCustomer, dispatch, info, navigate])

  
  return (
    <div className='signup-wrapper'>
    <div className='container'>
        <div className='signup-block'>
            <div className='form-wrapper'>
                <h2>Qeydiyyat</h2>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Ad</label>
                    <input  {...register("firstname", {required:"Adınızı daxil edin!",minLength: {value:3, message: "Min length is 3"}})} placeholder="Adınızı daxil edin" type="text"  style={errors.firstname?.message && {border: "3px solid red"}}/>
                    <p style={{color:"red"}}>{errors.firstname?.message}</p>
                    <label>Soyad</label>
                    <input  {...register("lastname", {required:"Soyadınızı daxil edin!",minLength: {value:4, message: "Min length is 6"}})} placeholder="Soyadınızı daxil edin" type="text" style={errors.lastname?.message && {border: "3px solid red"}}  />
                    <p style={{color:"red"}}>{errors.lastname?.message}</p>
                    <label>E-mail</label>
                    <input {...register("email", {required:"Email ünvanıızı daxil edin!",minLength: {value:8, message: "Invalid Email Format"}})} placeholder="nümunə@gmail.com" />
                    <p style={{color:"red"}}>{errors.email?.message}</p>
                    <label>Mobil nömrə</label>
                    <input  {...register("phone",  {required:"Mobil nömrənizi daxil edin!",minLength: {value:4, message: "Min length is 10"}})}  placeholder="050 000 00 00"/>
                    <p style={{color:"red"}}>{errors.phone?.message}</p>
                    <label>Şifrə</label>
                    <input  {...register("password",  {required:"Şifrənizi daxil edin!",minLength: {value:9, message: "Password must contain 8 letters and at least 1 symbol"}})}  placeholder="Şifrənizi daxil edin"/>
                    <p style={{color:"red"}}>{errors.password?.message}</p>
                  
                  <div style={{display:"flex"}}>
                    <input
                    style={{width:"20px", height:"20px", marginRight:"15px"}}
                      type="checkbox"
                      name="selectCheckbox"
                      id="selectCheckbox"
                      {...{
                        checked: true/false,
                        // onChange: changeHandler,
                      }}
                      checked
                    />
                    <label htmlFor="chooseCb" className="form-check-label"><span> <a href='#' style={{color:"#2D9CDB"}}>İstifadəçi şərtləri</a> ilə razıyam</span></label>
                    <div className="invalid-feedback">{errors.chooseCb?.message}</div>
                  </div>

                  <button  className='login-btn' >Qeydiyyat</button>
                  </form>
                </div>

            </div>  
            <div className='image-wrapper'>
              <div className='img'>
                <img src={signup} alt="signup"/>
              </div>
              <span>Artıq hesabınız var? <Link to={"/login"}><span style={{color: "#2D9CDB"}}>Daxil olun</span> </Link>  </span>
              <div className='dots'>
                <img src={dots}/>
              </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default SignUp