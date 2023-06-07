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
function Header(type) {
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
  { opensearch&&<> <div className="search">
        <div className="searchItem">
            <input type="text" placeholder='where are you going?'  className='Searchinput' onChange={(e)=>{
                setDestination(e.target.value)
            
            }}/>


        </div>
        <div className="searchItem">
        <FontAwesomeIcon icon={faCalendarDays} className='HeaderIcon'/>
            <span  className='headerSearchText'onClick={function()
            {
                setopendate(!opendate)
            }} >{`${format(dates[0].startDate,"MM/dd/yyyy")} to  ${format(dates[0].endDate,"MM/dd/yyyy")}`}</span>
            {opendate&&<DateRange
  editableDateInputs={true}
  onChange={item => setdates([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={dates}
  className="date"
/>}


        </div>
        <div className="searchItem">
        <FontAwesomeIcon icon={faPerson} className='HeaderIcon'/>
        <span  className='headerSearchText' onClick={()=>{
    setopenOption(!openOption)
}}>{`${option.adult}adult ${option.children} children ${option.room} room`}</span>

{openOption&&<div className="options" >
    <div className="optionItem">
        <span className="optiontext">
            Adult
        </span>
        <div className="optionCounter">
        <button className="optionCounterbutton" onClick={() => handleOption("adult", "d")} disabled={option.adult<=1}>-</button>
        <span className="optionNumber">{option.adult}</span>
        <button className="optionCounterbutton" onClick={() => handleOption("adult", "i")}>+</button>
        </div>
    </div>
    <div className="optionItem">
        <span className="optiontext">
            Children
        </span>
        <div className="optionCounter">
        <button className="optionCounterbutton" disabled={option.children<1} onClick={() => handleOption("children", "d")} >-</button>
        <span className="optionNumber" >{option.children}</span>
        <button className="optionCounterbutton" onClick={() => handleOption("children", "i")}>+</button>
        </div>
    </div>
    <div className="optionItem">
        <span className="optiontext">
            room
        </span>
        <div className="optionCounter">
        <button className="optionCounterbutton"  disabled={option.room<=1}  onClick={() => handleOption("room", "d")}>-</button>
        <span className="optionNumber">{option.room}</span>
        <button className="optionCounterbutton" onClick={() => handleOption("room", "i")}>+</button>
        </div>
    </div>
</div>}


        </div>
        <div className="searchItem">
            <button className="headerBtn" onClick={HandleSearch}>Search</button>
        </div>
    </div></>}
    </div>
   </div>
  )
}

export default Header