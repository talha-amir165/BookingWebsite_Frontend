import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
 Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home';
import List from './Pages/List';
import Hotel from './Pages/Hotel';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import AddHotel from './Pages/AddHotel';
import Addroom from './Pages/Addroom';
function App() {
  return (
    
      
     <Router>
     <Routes>
      <Route path='/' element={<Home/>}>
       
        </Route>
        <Route path='/register' element={<Register/>}>

</Route>

        <Route path='/hotels' element={<List/>}>
       
       </Route>
       <Route path='/hotel/:id' element={<Hotel/>}>
       
       </Route>
       <Route path='/login' element={<Login/>}>

       </Route>
       <Route path='/admin'element={<Admin/>}>
        </Route>
        
       <Route path='/addhotel'element={<AddHotel/>}>
        </Route>
    <Route path='/addroom/:id' element={<Addroom></Addroom>}></Route>
      
      </Routes>
     </Router>
   
  );
}

export default App;
