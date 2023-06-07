import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userService from "../Services/UserService";
import './admin.css'
function Admin() {
    const navigate = useNavigate();
    const [openUser, setOpenUser] = useState(false);
    const [openHotel, setOpenHotel] = useState(false);
    const [admin, setadmin] = useState(false)
    const [hotel, sethotel] = useState([])
    //const {data,loading,reFetch} = useFetch(`/auth/users`)
    const [_id, setid] = useState()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    function handleroom(id) {

        navigate("/addroom/" + id)
    }
    async function fetchData(url) {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    function handleuser() {
        setOpenUser(true)
        setOpenHotel(false)
        fetchData('/auth/users')

    }
    function handleHotel() {
        setOpenUser(false);
        setOpenHotel(true);

        fetch('http://localhost:5000/api/adminHotel')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                sethotel(data)
                // Process the data here, such as updating state or rendering it in the UI
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Handle the error here, such as displaying an error message
            });
    }
    async function deleteUser(id) {
        const res = await axios.delete(`http://localhost:5000/auth/${id}`)
            .then(res => {
                console.log("deleted" + id + " " + res.data)
                fetchData('/auth/users')
            })
            .catch("error in delete")


    }
    async function deleteHotel(id) {
        const res = await axios.delete(`http://localhost:5000/api/${id}`)
            .then(res => {
                console.log("deleted" + id + " " + res.data)
                fetchData('/api/')
            })
            .catch("error in delete")
    }


    useEffect(() => {
        function checkAdmin() {
            if (userService.isAdmin() == true) {
                setadmin(true)
            }
            else {
                navigate("/")
            }
        }
        checkAdmin();
    }, [])


    return (


        <>
            {admin && <div className='admin'>
                <nav>
                    <h2>
                        Admin Panel
                    </h2>
                    <button onClick={handleuser}>
                        Users

                    </button>
                    <button onClick={handleHotel}>
                        Hotels
                    </button>
                </nav>
                {openUser && <div className="Users">

                    {data.map((item) => userService.getLoggedInUser()._id != item._id ? <div className='user' key={item._id}><h4>{item.username}</h4> <h4>{item.email}</h4>
                        <button className='Delete' onClick={() => {
                            const key1 = item._id
                            deleteUser(key1)
                        }}  >Delete  </button>

                    </div> : <p></p>)}

                </div>}
                {openHotel && <div className="hotels">
                    {hotel.map((item) => <div className='hotel' key={item._id}><h4>{item.name}</h4> <h4>{item.city}</h4>

                        <button onClick={() => {
                            const key1 = item._id
                            handleroom(key1)
                        }} >Add Rooms</button>
                        <button className='Delete' onClick={() => {
                            const key1 = item._id
                            deleteHotel(key1)
                        }}>Delete</button>

                    </div>)}
                    <Link to="/addhotel"><button className='addhotel'>Add Hotel</button></Link>
                </div>}
            </div>}
        </>
    )
}

export default Admin