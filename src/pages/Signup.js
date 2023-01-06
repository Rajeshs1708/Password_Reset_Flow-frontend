import React,{useState} from 'react'
import '../css/style.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup () {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        if (name && email && password) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, { name: name, email: email, password: password })
                .then(res => {
                    if (res) {
                        const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored'});
                        notify()
                        setTimeout(() => {
                            navigate('/')
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
        <h1 className='heading'>Signup</h1>
        <label className='label'>Name</label>
        <input className='input' value={name} onChange={e => setName(e.target.value)} type="name" name='name' />
        <label className='label'>E-mail</label>
        <input className='input' value={email} onChange={e => setEmail(e.target.value)} type="email" name='email' />
        <label className='label'>Password</label>
        <input className='input' value={password} onChange={e => setPassword(e.target.value)} type="password" name='password' />
        <button className='button'>Signup</button>
        <ToastContainer hideProgressBar={true}/>
      </form>
    </div>
  )
}

export default Signup
