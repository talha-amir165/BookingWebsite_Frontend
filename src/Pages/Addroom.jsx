import React from 'react'
import { useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";
import userService from '../Services/UserService';
import axios from 'axios'
function Addroom() {
    const location = useLocation();
    const [title,settitle] = useState('')
    const [maxpeople,setpeople] = useState();
    const [admin,setadmin] =useState(false)
    const [desc,setdesc] = useState('');
    const [price,setprice] = useState()
    const [room,setroom] = useState()
    const id = location.pathname.split("/")[2];
   
   async function handleAdd()
    {
        const rooms = {title:title,maxpeople:maxpeople,desc:desc,price:price,roomNumbers:[{number:room}]};
        await axios.post(`/room/${id}`,rooms)
        .then(res =>{console.log(res.data) 
            
        })
        .catch(err=>{console.log(err)})
        ;
    }
    useEffect(() => {
      function checkAdmin()
      {
         if(userService.isAdmin()==true)
         {
          setadmin(true)
         }
         else{
          window.location.href = "/"
         }
      }
      checkAdmin();
  }, [])
  return (
    <div>Addroom

        <label htmlFor=""> title</label>
        <input type="text" name="" id=""  onChange={(e) => {
            settitle(e.target.value);
          }} />
        <label htmlFor=""> max people</label>
        <input type="number" name="" id=""  onChange={(e) => {
            setpeople(e.target.value);
          }}/>
        <label htmlFor=""> desc</label>
        <input type="text" name="" id=""  onChange={(e) => {
            setdesc(e.target.value);
          }}/>
        <label htmlFor=""> price</label>
        <input type="number" name="" id=""  onChange={(e) => {
            setprice(e.target.value);
          }} />
        <label htmlFor="">Room Number</label>
        <input type="number" name="" id=""  onChange={(e) => {
            setroom(e.target.value);
          }} />
          <button onClick={()=>{handleAdd();
          window.location.href = "/admin";
          }}>Add Room</button>
    </div>
  )
}

export default Addroom