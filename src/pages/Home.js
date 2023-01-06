import React,{useEffect} from 'react'
import '../css/home.css'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Home () {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    try {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/signout`)
            .then(res => {
                if (res) {
                    localStorage.removeItem("TOKEN");
                    localStorage.removeItem("NAME");
                    localStorage.removeItem("EMAIL");
                    const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored'});
                    notify()
                    setTimeout(() => {
                        navigate('/')
                    }, 1000)

                }
            })
            .catch(err => {
              const notify = () => toast.error(`${err.response.data.message}`, { theme: 'colored'});
                    notify()
            })

    } catch (err) {
        console.log("Error...", err);
    }
}
  return (
    <div className='home'>
      <div className='navbar'>
        <h3>Logo</h3>
        <ul>
          <li>Home</li>
          <li onClick={handleLogout}>Logout</li>
          <ToastContainer hideProgressBar={true}/>
        </ul>
      </div>

      <div className='userDetails'>
        <div className='userInfo'>
          <h3>Name: {localStorage.getItem("NAME")}</h3>
          <h3>Email: {localStorage.getItem("EMAIL")}</h3>
        </div>
      </div>
    </div>
  )
}

export default Home
