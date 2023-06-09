import React, { useEffect, useState } from "react";
const Profile=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [business,setBusiness]=useState('');
    const [adding,setAdding]=useState(false);
    const userId=JSON.parse(localStorage.getItem('user')).id;
    // const navigate=useNavigate();
    useEffect(()=>{ 
         getProductDetails();
    },[])
    const getProductDetails=async ()=>{
       let response=await fetch(`https://dashboardapi.onrender.com/profile/${userId}`)
       let data=await response.json();
       setName(data.name);
       setEmail(data.email);
       setBusiness(data.business);
    }
    const updateProduct=async()=>{
        setAdding(true);
        if(!name||!email||!business){
            alert("Please Fill all the feilds");
            setAdding(false);
            return;
        }
        const reponse=await fetch(` http://localhost:5000/profile/${userId}`,{
            method:'PUT',
            body:JSON.stringify({name,email,business}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        // let data=await reponse.json();
        setAdding(false);
    }
    return(
        <>
        <h1>Profile</h1>
        <div className="form">
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Business"value={business} onChange={(e)=>setBusiness(e.target.value)} />
            <button type="button" disabled={adding} onClick={updateProduct}>{adding?'Updating ...':'Update'}</button>
        </div>
        </>
    );
}
export default Profile;