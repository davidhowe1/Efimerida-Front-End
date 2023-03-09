import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons'
import React from 'react'

function AlertMessage({ alert, alertIsActive, theme }) {
  return (
    <div 
    className={alertIsActive ? 'alert-message active' : 'alert-message'}
    style={theme === 'light' ? {
        backgroundColor: alert.includes('Error: ') ? '#fff3f3' : '#f3fffb',
        border: alert.includes('Error: ') ? '1px solid #ffc7c7' : '1px solid #c7fff3'
        } : {
          backgroundColor: alert.includes('Error: ') ? '#1c0505' : '#051c11',
          border: alert.includes('Error: ') ? '1px solid #ffc7c7' : '1px solid #c7fff3'
        }}>

        <p style={theme === 'dark' ? {
          color: alert.includes('Error: ') ? '#ffc7c7' : '#c7fff3'} : {
            color: 'black'
          }}>{alert}</p>

        <div className='alert-icon'>
          {alert.includes('Error: ') ? 
          <ExclamationCircleFill className='alert' style={{marginLeft: '10px'}}/>
          : <CheckCircleFill className='success' style={{marginLeft: '10px'}}/>}
        </div>
    </div>
  )
}

export default AlertMessage