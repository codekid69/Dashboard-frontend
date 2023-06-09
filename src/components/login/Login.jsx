import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false);
     const navigate=useNavigate();

     useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })
    
    const handleLogin = async () => {
        setLogin(true);
        if(!email||!password){
            alert("Please fill all the feilds");
            setLogin(false);
            return;
        }
        const response = await fetch(` http://localhost:5000/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setLogin(false);
        const data=await response.json();
        localStorage.setItem('user',JSON.stringify(data));
        console.log(data);
        navigate('/');
    }
    return (
        <>
            <h1>Login</h1>
            <div className="form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={handleLogin} disabled={login}>{login ? 'Loging in...' : 'Login'}</button>
            </div>
        </>
    )
}
export default Login;