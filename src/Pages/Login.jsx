
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../Services/UserService";
import "./login.css";



const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const { loading, error, dispatch ,user} = useContext(AuthContext);
  const [status, setStatus] = useState();
  const [data, setdata] = useState()
  const navigate = useNavigate()





  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="lInput"
        />
        <button onClick={(e) => {
          userService
            .login(email, password)
            .then((data) => {

              window.location.href = "/";
            })
            .catch((err) => {
              console.log(err);
              setStatus(err.response.status);
              setdata(err.response.data)
            });
        }} className="lButton">
          Login
        </button>
        {status && <div>
          {data}
        </div>}
      </div>
    </div>
  );
};

export default Login;