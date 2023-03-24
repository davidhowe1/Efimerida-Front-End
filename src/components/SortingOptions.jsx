import { React, useEffect, useState } from 'react'
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

function SortingOptions({ setPosts, sortType, handleSortTypeChange }) {

  const [options, setOptions] = useState(false)
  const toggleMoreOptions = () => setOptions(!options)
  const url = window.location.pathname

  const handleSort = () => {
    if (sortType === 'latest') {
      setPosts(posts => [...posts].sort((a, b) => new Date(a.post_created_date) - new Date(b.post_created_date)));
    } else if (sortType === 'most-viewed') {
      setPosts(posts => [...posts].sort((a, b) => a.post_views - b.post_views));
    } else if (sortType === 'most-liked') {
      setPosts(posts => [...posts].sort((a, b) => a.post_likes.length - b.post_likes.length));
    }
  };
  
  useEffect(() => {
    handleSort();
  }, [sortType]);

  return (
    <section className='right-side-panel'>
      <h1>Sorting Options</h1>
      <div className='sorting-options'>

        <Link to='/All'>
          <button
          className={url !== '/Subscriptions' ? 'sorting-option active' : 'sorting-option'}>Articles
          </button>
        </Link>

        <Link to='/Subscriptions'>
          <button 
          className={url === '/Subscriptions' ? 'sorting-option active' : 'sorting-option'}>Subscriptions
          </button>
        </Link>
      </div>

      {url !== '/Subscriptions' ?
        <div>
          <p onClick={toggleMoreOptions} style={{cursor: "pointer"}}>
            More Options
            {options ? <CaretUpFill style={{marginLeft: "5px"}} /> 
                    : <CaretDownFill style={{marginLeft: "5px"}}/>}
          </p>
          {options &&
            <div className='more-sorting-options'>
              <label>Show First</label>
              <span>
                <button onClick={() => handleSortTypeChange('latest')} 
                  className={ sortType === 'latest'
                    ? 'sorting-option active' : 'sorting-option'}>Latest</button>

                <button onClick={() => handleSortTypeChange('most-viewed')} 
                  className={ sortType === 'most-viewed' 
                    ? 'sorting-option active' : 'sorting-option'}>Most Viewed</button>

                <button onClick={() => handleSortTypeChange('most-liked')} 
                  className={ sortType === 'most-liked'
                    ? 'sorting-option active' : 'sorting-option'}>Most Liked</button>
              </span>
            </div>
          }
        </div>
      : null}

    </section>
  )
}

export default SortingOptions