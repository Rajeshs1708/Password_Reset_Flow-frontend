import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import NewPassword from './pages/NewPassword'
import Home from './pages/Home'

function App () {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/forgetPassword' element={<ForgetPassword />} />
          <Route path='/newPassword' element={<NewPassword />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
