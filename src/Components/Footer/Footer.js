import './footer.scss'
import React from 'react'
import youtubeLogo from './icons/youtube.png'
import twitterLogo from './icons/twitter.png'
import locationLogo from './icons/location.png'
import emailLogo from './icons/email.png'
import instagramLogo from './icons/instagram.png'
import facebookLogo from './icons/facebook.png'


const Footer = () => {
  return (
    <div className='footer-main'>
        <div className='container'>
            <div className='footer'>
                <div className='item-social-media'>
                    <div className='logo'>
                        <img src='data:image/png;base64,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'></img>
                        <h2 className='logo-h2'>Tello</h2>
                    </div>
                    <div className='icons'>
                        <img className='icon' src={instagramLogo}></img>
                        <img className='icon' src={facebookLogo}></img>
                        <img className='icon' src={youtubeLogo}></img>
                        <img className='icon' src={twitterLogo}></img>
                    </div>
                </div>
                
                <ul className='ul'>
                    <h2 className='ul-h2'>Menu</h2>
                    <li className='list-item'><a className='li-a' href=''>Yeni</a></li>
                    <li className='list-item'><a className='li-a' href=''>Endirimler</a></li>
                    <li className='list-item'><a className='li-a' href=''>Aksessuarlar</a></li>
                    <li className='list-item'><a className='li-a' href=''>Bütün brendler</a></li>
                </ul>

                <ul className='ul'>
                    <h2 className='ul-h2'>Kömək</h2>
                    <li className='list-item'><a className='li-a' href=''>Tez-tez soruşulan suallar</a></li>
                    <li className='list-item'><a className='li-a' href=''>Çatdırılma xidməti</a></li>
                    <li className='list-item'><a className='li-a' href=''>Geri qaytarılma şərtləri</a></li>
                </ul>

                <ul className='ul'>
                    <h2 className='ul-h2'>Əlaqə</h2>
                    <li className='list-item'><a className='li-a' href=''>M. K. Ataturk avenue 89, Baku, Azerbaijan</a></li>
                    <li className='list-item'><a className='li-a' href=''>example@gmail.com</a></li>
                    <li className='list-item'><a className='li-a' href=''>*2108</a></li>
                </ul>
            </div>
        </div>
        <hr></hr>
        <div className='container'>
            <div className='sub-footer'>
                <p>Tello 2021. Bütün hüquqlar qorunur.</p>
                <div className='sub-footer-right'>
                    <span>Qaydalar və şərtlər</span>
                    <span>Məxfilik siyasəti</span>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Footer
