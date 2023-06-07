import React from 'react'
import Navbar from '../Components/Navbar'
import Headersecond from '../Components/Headersecond'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import useFetch from '../hooks/useFetch'
import { useLocation,useNavigate } from "react-router-dom";
import './hotel.css'
import { SearchContext } from '../context/SearchContext';
import { useContext,useState } from 'react'

import userService from '../Services/UserService'
import Reserve from '../Components/Reserve'


function Hotel() {

    const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];
  const {dates,option} = useContext(SearchContext)
  console.log(dates)
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const handleClick = () => {
    if (userService.isLoggedIn()) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  console.log(days)
  const {data,loading} = useFetch(`/api/find/${id}`)
  

  return (

    
    <>
    <Navbar/>
    <Headersecond />
    {loading?("loading"):(<div className="hotelContain">
        <div className="hotelWrapper">
            <h1 className="hoteltitle">
                {data.name}
            </h1>
            <div className="address">
<FontAwesomeIcon icon={faLocationDot}/>
<span>
    {data.address}
</span>

            </div>

    <span className='HotelDistance'>
        {data.distance}
    </span>
    <span className='HotelPrice'> Book hotel at {data.cheapestPrice} and get free taxi</span>
    <div className="HotelImage">
    {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
    </div>
    <div className="HotelDetail">
        <div className="detailText">
            <h1 className="hoteltitle">
                Stays in heart of krakarow
                
            </h1>
            <p className="hotelDesc">
                {data.desc}
                </p>
        </div>
        <div className="hotelDetailPrice">
            <h1>
                Perfect for 9 night stay
            </h1>
            <span>
                Located in {data.address}
            </span>
            <h2>
                {days*data.cheapestPrice*option.room} for ({days}nights)
                <button className='Reserve' onClick={handleClick}>Reserve Now</button>
                
            </h2>
        </div>
    </div>
    {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
        </div>
    </div>)}
    </>
  )
}

export default Hotel