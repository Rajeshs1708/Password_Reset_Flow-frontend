import React,{useState} from 'react'
import '../css/style.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword () {
  const navigate = useNavigate()

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
          if (email) {
              axios.post(`${process.env.REACT_APP_BASE_URL}/api/send-otp`, { email: email })
                  .then(res => {
                      console.log(`OTP : ${res.data.otp}`);
                      if (res.data.code === 200) {
                          const notify = () => toast.success(`*${res.data.message} ${res.data.otp}*`, { theme: 'colored' });
                          notify()
                          setTimeout(() => {
                              navigate('/newPassword')
                          }, 4000)
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
      <form autoComplete='off' onSubmit={handleSubmit}>
        <h1 className='heading mb-5 mt-4'>Forget Password</h1>
        <label className='label'>E-mail</label>
        <input className='input' value={email} onChange={e => setEmail(e.target.value)} type="email" name='email' />
        <button className='button'>Send OTP</button>
        <ToastContainer
                        autoClose={3000}
                        theme="colored"
                    />
      </form>
    </div>
  )
}

export default ForgetPassword
