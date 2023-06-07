import React from 'react'
import userService from "../Services/UserService";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
function AddHotel() {

    const [admin,setadmin] =useState(false)
    const [name,setname] = useState('')
    const [title,settitle] = useState('')
    const [city,setcity] = useState('')
    const [address,setaddress] = useState('')
    const [type,settype] = useState('')
    const [price,setprice] = useState('')

    function handleAdd()
    {

        const hotel = {name:name,title:title,city:city,address:address,cheapestPrice:price,type:type};
        axios.post('/api/', hotel)
        .then(res =>{console.log(res) 
          //window.location.href = "/admin";
          navigate("/admin")  
        }) ;
    }
    useEffect(() => {
        function checkAdmin()
        {
           if(userService.isAdmin()==true)
           {
            setadmin(true)
           }
           else{
            navigate("/")  
           }
        }
        checkAdmin();
    }, [])
    let navigate = useNavigate();
  return (
    <div>
 {admin&&<div className="hotelcontainer">
    <label htmlFor="">Hotel name</label>
    <input type="text" name="" id="" onChange={(e) => {
            setname(e.target.value);
          }} />
    <label htmlFor="">title</label>
    <input type="text" name="" id="" onChange={(e) => {
            settitle(e.target.value);
          }} />
    <label htmlFor="">city</label>
    <input type="text" name="" id="" onChange={(e) => {
            setcity(e.target.value);
          }} />
    <label htmlFor="">address</label>
    <input type="text" name="" id="" onChange={(e) => {
            setaddress(e.target.value);
          }} />
    <label htmlFor="">type</label>
    <input type="text" name="" id="" onChange={(e) => {
            settype(e.target.value);
          }} />
    <label htmlFor="">Price</label>

    <input type="number" name="" id="" onChange={(e) => {
            setprice(e.target.value);
          }} />
          <button onClick={handleAdd}>Add hotel </button>
 </div>
}
    </div>
  )
}

export default AddHotel