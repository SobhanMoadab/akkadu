import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/Constants'
import './Login.css'
export default function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function LoginHandler(e) {
        e.preventDefault()
        const data = {
            name: name,
            password: password,
        }
        axios.post(`${BASE_URL}/api/v1/users/signin`, data)
            .then(res => {
                localStorage.setItem('id', res.data.result._id)
                localStorage.setItem('token', res.data.result.token[0])
                setName('')
                setPassword('')
                navigate('/')
            })
            .catch(e => console.log(e))
    }
    return (
        <div className="login-page">
            <div className="form">
                <form className="register-form">
                    <input type="text" placeholder="name" />
                    <input type="password" placeholder="password" />
                    <input type="text" placeholder="email address" />
                </form>
                <form onSubmit={e => LoginHandler(e)} className="login-form">
                    <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="username" />
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="password" />
                    <button className='btn btn-primary ' >login</button>
                    <Link className="message" to='/register'>Not registered?</Link>
                </form>
            </div>
        </div>
    )
}