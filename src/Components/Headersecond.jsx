import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed,faTaxi,faCar,faCalendarDays,faPerson } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range';
import {useState,useContext} from 'react'
import { SearchContext } from '../context/SearchContext';
import {
    BrowserRouter as Router,
   Routes,
    Route,
    Link,useNavigate
  } from "react-router-dom";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import{format} from 'date-fns'
import './Header.css'
function Headersecond(type) {
    const navigate =useNavigate();

    const [destination,setDestination] =useState('')
    const [dates, setdates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const [opendate,setopendate] = useState(false);
      const [openOption,setopenOption] = useState(false);
      const [opensearch,setopensearch] = useState(true);
      const [option,setoption] = useState({
        adult:1,
        children:0,
        room:1
      })
      const handleOption = (name, operation) => {
        setoption((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
          };
        });
      };
      function SearchShow()
      {
        if(type=='List')
        {
            setopensearch(false)
        }
      }
      const { dispatch } = useContext(SearchContext);

      function HandleSearch()
      {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, option } });
        navigate("/hotels",{state:{destination,dates,option}})
      }
  return (
   <div className="header">
<div className={type=='List'?"headerContainer":"headerContaineractive"}>
    <div className="headerList">
    <div className="headerListItems">
    <FontAwesomeIcon icon={faBed}/>
    <span>
        stays
    </span>
    </div>
    <div className="headerListItems">
    <FontAwesomeIcon icon={faCar}/>
    <span>
        Car rentals
    </span>
    </div>
    <div className="headerListItems">
    <FontAwesomeIcon icon={faTaxi}/>
    <span>
        Airport Taxi
    </span>
    </div>
    
    </div>
    <h1 className="headertitle">
        A Life time Discount?
    </h1>
    <p className="decription">
        A life Time Discount  for your trips
    </p>
 
    </div>
   </div>
  )
}

export default Headersecond