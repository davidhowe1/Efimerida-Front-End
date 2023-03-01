import React from 'react'

function DimBackground({ hideLoginOrSignUpWindow }) {
  return (
    <div onClick={hideLoginOrSignUpWindow} className='dim-background'> </div>
  )
}

export default DimBackground