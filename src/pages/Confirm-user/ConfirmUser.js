import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './confirmUser.scss'
import { useDispatch } from 'react-redux'
import { loginTokenForJWT } from '../../redux/action/auth'
import { useNavigate } from 'react-router-dom';

const ConfirmUser = () => {

  const params= useParams()
  const id= params.token

  const dispatch= useDispatch()
  const navigate= useNavigate()

  useEffect(() => {
    dispatch(loginTokenForJWT(id))
    .then(_=>navigate("/"))
  },[dispatch, id, navigate])

  return (
    <div style={{padding: "320px 0"}}>
        <div className='loading'>
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>                
        </div> 
    </div>
  )
}

export default ConfirmUser