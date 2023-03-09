import { React } from 'react'
import { Sliders2, X } from 'react-bootstrap-icons'

function SortingToggleButton({ toggleSortingOptions, sortingToggle }) {
  return (
    <div className='toggle-sorting-options-mobile' onClick={toggleSortingOptions}>
        {!sortingToggle ? 
          <>
            <p>Sort</p>
            <Sliders2 style={{   
                    height: '20px',
                    width: '20px',
                    margin: '0px 5px',
                    padding: '5px',
                }}/>
          </>
            :
          <>
            <p>Close</p>
            <X style={{
              height: '20px',
              width: '20px',
              padding: '5px',
            }}/>
          </>
        }
    </div>
  )
}

export default SortingToggleButton