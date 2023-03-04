import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons'
import React from 'react'

function AlertMessage({ alert, alertIsActive }) {
  return (
    <div 
    className={alertIsActive ? 'alert-message active' : 'alert-message'}
    style={{
        backgroundColor: alert.includes('Error: ') ? '#fff3f3' : '#f3fffb',
        border: alert.includes('Error: ') ? '1px solid #ffc7c7' : '1px solid #c7fff3'
        }}>

        <p>{alert}</p>

        <div className='alert-icon'>
          {alert.includes('Error: ') ? 
          <ExclamationCircleFill className='alert' style={{marginLeft: '10px'}}/>
          : <CheckCircleFill className='success' style={{marginLeft: '10px'}}/>}
        </div>
    </div>
  )
}

export default AlertMessage