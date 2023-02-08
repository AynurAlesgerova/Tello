import './checkMail.scss'
import chechkMail from './check-mail.png'

import React from 'react'

const CheckkMail = () => {
  return (
    <div className='check-mail'>
        <img src={chechkMail}/>
        <p>E - poçt ünvanınızı yoxlayın. </p>
        <p>Göndərilmiş linkə keçid edin!</p>
    </div>
  )
}

export default CheckkMail