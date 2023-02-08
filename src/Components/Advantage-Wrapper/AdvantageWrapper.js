import React from 'react'
import './advantageWrapper.scss'
import advg1 from './advg.png'
import advg2 from './advg-2.png'
import advg3 from './advg-3.png'


const AdvantageWrapper = () => {
  return (
    <div className='advantage-wrapper'>
        <div className='container'>
            <div className='advantage-block'>
                <div className='advantage-item'>
                    <div><img src={advg1}/></div>
                    <h3>Çatdırılma</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                </div>
                <div className='advantage-item'>
                    <div><img src={advg2}/></div>
                    <h3>Çatdırılma</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                </div>
                <div className='advantage-item'>
                    <div><img src={advg3}/></div>
                    <h3>Çatdırılma</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdvantageWrapper