import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import Featured from '../Components/Featured'
import PropertyList from '../Components/PropertyList'
import FeaturedProperties from '../Components/FeaturedProperties'
import './home.css'

function Home() {
  return (
    <div>
        <Navbar>

        </Navbar>
        <Header type="List"/>
        <div className="homeContainer">
          <Featured></Featured>
          <h1 className="hometitle">
            Browse by Property type
          </h1>
          <PropertyList/>
          <h1>
            Homes guest Love
          </h1>
<FeaturedProperties></FeaturedProperties>
        </div>
       
    </div>
  )
}

export default Home