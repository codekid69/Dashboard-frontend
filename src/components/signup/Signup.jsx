import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [business, setBusiness] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const[signup,setSignup]=useState(false);
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/login');
        }
    })

    const collectData = async () => {
        setSignup(true);
        if (!email ||!name|| !business || !password || !confirmPassword) {
            alert("Please fill all the feilds");
            setSignup(false);
            return;
        }
        if(name.length<=3){
            alert("name is too short");
            setSignup(false);
            return;
        }
        if(password.length<=4){
            alert("Password must be of minimum 5 characters");
            setSignup(false);
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and confirm Password Not matching");
            setSignup(false);
            return;
        }
        const result = await fetch(`http://localhost:5000/signup`, {
            method: "POST",
            body: JSON.stringify({ name,email, business, password,confirmpassword:confirmPassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await result.json();
        console.log("herer",data);
        if(data){
            navigate('/login');
        }
        setSignup(false);
    };
    return (
        <>
            <div>
                <h1>SignUp</h1>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Business Name"
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button disabled={signup} onClick={collectData} type="button">
                        {signup?'Signing Up ...':'SignUp'}
                    </button>
                </div>
            </div>
        </>
    );
};
export default Signup;
