import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Components/Signup'
import Login from './Components/Login';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import ForgotUsername from './Components/ForgotUsername';
import ResetUsername from './Components/ResetUsername';

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword/>}></Route>
        <Route path='/resetPassword/:token' element={<ResetPassword/>}></Route>
        <Route path='/forgotUsername' element={<ForgotUsername/>}></Route>
        <Route path='/resetUsername/:token' element={<ResetUsername/>}></Route>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
