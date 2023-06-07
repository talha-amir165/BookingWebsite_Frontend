import React from 'react'
import hunza from './pic.jpg'
import './Featured.css'
import useFetch from '../hooks/useFetch'
import Naran from './naran.jpg'
import Lahore from './Lahore.jpg'
function Featured() {
  const {data,loading,error} = useFetch("/api/countByCity?cities=Hunza,Naran,Lahore")
  return (
    
<div className="featured">

      {loading?("loading please"):(<><div className="featuredItem">
        <img
          src={hunza}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Hunza</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src={Naran}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Naran</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src={Lahore}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Lahore</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>)}
    </div>
      )
}

export default Featured