// import logo from './logo.svg';
import './App.css';
import AdminLogin from './components/Sign In/AdminLogin';
import ForgotPassword from './components/Sign In/ForgotPassword';
import StudentLogin from './components/Sign In/StudentLogin';

import { BrowserRouter, Routes, Route, } from "react-router-dom";



import StudentHomepage from './components/User_Side/Studenthp';
import Adminhp from './components/Admin Side/Adminhp';
import AdminStudentRegister from './components/Admin Side/AdminStudentRegister';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import FetchAnnouncements from './components/FetchAnnouncement';

function App() {
  return (
    <div className="App">
   {/* <StudentLogin/> */}
      <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<Home/>}/>
        <Route path='/studentlogin' element={<StudentLogin/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        
        <Route path='/studenthome' element={<StudentHomepage/>}/>
        <Route path='/adminhome' element={<Adminhp/>}/>
        <Route path='/registerstudent' element={<AdminStudentRegister/>}/>
        <Route path="/announcement/:id" element={<FetchAnnouncements />} />        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
