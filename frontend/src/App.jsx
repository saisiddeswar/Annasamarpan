import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import './App.css'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Navbar from '../component/Navbar'
import Registration from '../pages/Registration'
import Login from '../pages/Login'
import Ngo from '../pages/Ngo'
import Institutes from '../pages/Institutes'
import Logout from '../pages/Logout'
import Dashboard from '../component/Dashboard'


function App() {


  return (
   <Router>
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/contact' element={<Contact/>}></Route>
    <Route path='/logout' element={<Logout/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Registration/>}></Route>
    <Route path='/Dashboard' element={<Dashboard/>}></Route>
    <Route path='/institute-dashboard' element={<Institutes/>}></Route>
    <Route path='/ngo-dashboard' element={<Ngo/>}></Route>
   
    
    </Routes>
   </Router>
  )
}

export default App
