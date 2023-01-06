import React,{useState} from 'react'
import '../css/style.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NewPassword () {
  const navigate = useNavigate()

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (otp && password) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/submit-otp`, { otp: otp, password: password })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
              const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored' });
              notify()
              setTimeout(() => {
                navigate('/')
              }, 3000)
            }else{
              const notify = () => toast.error(`*${res.data.message}*`, { theme: 'colored' });
              notify()
            }
          })
          .catch(err => {
            console.log(err);
            const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
            notify()
          })

      } else {
        const notify = () => toast.error("* Invalid input *", { theme: 'colored' });
        notify()
      }
    } catch (err) {
      console.log("Error...", err);
    }
  }

  return (
    <div className='landingPage'>
      <form autoComplete='off'onSubmit={handleSubmit}>
        <h1 className='heading mb-5 mt-4'>New Password</h1>
        <label className='label'>OTP</label>
        <input className='input' value={otp} onChange={e => setOtp(e.target.value)} type="otp" name='otp' />
        <label className='label'>New Password</label>
        <input className='input' value={password} onChange={e => setPassword(e.target.value)} type="password" name='password' />
        <button className='button'>Submit</button>
        <ToastContainer
                        autoClose={3000}
                        theme="colored"
                    />
      </form>
    </div>
  )
}

export default NewPassword
