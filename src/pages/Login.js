import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios";
import '../css/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login () {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        if (email && password) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/signin`, { email: email, password: password })
                .then(res => {
                    if (res) {
                        const notify = () => toast.success(`Welcome Mrs/Mr.${res.data.user.name}`, {
                            autoClose: 3000,
                            theme: "colored",
                        });;
                        notify()
                        localStorage.setItem('TOKEN', res.data.token)
                        localStorage.setItem('NAME', res.data.user.name)
                        localStorage.setItem('EMAIL', res.data.user.email)
                        setTimeout(() => {
                            navigate('/home')
                        }, 3000)
                    }
                })
                .catch(err => {
                    const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                    notify()
                })

        } else {
            const notify = () => toast.error("Invalid input", { theme: 'colored' });
            notify()
        }
    } catch (err) {
        const notify = () => toast.error(" Input Error", { theme: 'colored' });
        notify()
        console.log("Error...", err);
    }
}
  return (
    <div className='landingPage'>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <h1 className='heading'>Login</h1>
        <label className='label'>Email</label>
        <input className='input' value={email} onChange={e => setEmail(e.target.value)} type="email" name='email' />
        <label className='label'>Password</label>
        <input className='input' value={password} onChange={e => setPassword(e.target.value)} type="password" name='password' />
        <p className='pTag'>
          Don't have an account ? <Link to='/signup'>Signup</Link>
        </p>
        <button className='button'>Login</button>
        <ToastContainer autoClose={3000} theme="colored" />
        <Link to='/forgetPassword'>Forget Password ?</Link>
      </form>
    </div>
  )
}

export default Login
