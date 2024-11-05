import React , {useEffect, useState} from 'react'
import { debounce, loadContentsDynamically } from '../logics/infiniteScroll';

const InfiniteScroll = () => {

    const [containers , setContainers] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(() => {  
        // load initial content
        loadContentsDynamically(loading,setLoading,setContainers);

        // debouncing applied on scroll event
        const debounceHandleScroll = debounce(() => loadContentsDynamically(loading,setLoading,setContainers),300)
        window.addEventListener("scroll",debounceHandleScroll);
        return () => {
            window.removeEventListener("scroll",debounceHandleScroll);
        }

    },[])

  return (
    <div id="scrolling-page">
        <h2 className='title'>InfiniteScroll</h2>
        <div id='content-page-for-scrolling'>
            
            { 
                containers.map((item,i) => <div key={item+i} className='dummy-container'>{item}</div>)
            }

            {
            loading ? <p className='loading'>Loading...</p> : <p></p>
            }
           
        </div>

    </div>
  )
}

export default InfiniteScroll