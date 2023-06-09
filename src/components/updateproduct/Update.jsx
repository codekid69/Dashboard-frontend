import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Update=()=>{
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [subCategory,setSubCategory]=useState('');
    const [adding,setAdding]=useState(false);
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{ 
         getProductDetails();
    },[])
    const getProductDetails=async ()=>{
       let response=await fetch(`https://dashboardapi.onrender.com/product/${params.id}`)
       let data=await response.json();
       setName(data.name);
       setPrice(data.price);
       setCategory(data.category);
       setSubCategory(data.subcategory);
    }
    const clearForm=()=>{
        setName('');
        setPrice('');
        setCategory('');
        setSubCategory('');
    }
    const updateProduct=async()=>{
        setAdding(true);
        if(!name||!price||!category||!subCategory){
            alert("Please Fill all the feilds");
            setAdding(false);
            return;
        }
        const reponse=await fetch(` https://dashboardapi.onrender.com/product/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,price,category,subcategory:subCategory}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        let data=await reponse.json();
        if(data){
            navigate('/');
        }
        setAdding(false);
    }
    return(
        <>
        <h1>Update Product</h1>
        <div className="form">
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Price"value={price} onChange={(e)=>setPrice(e.target.value)} />
            <input type="text" placeholder="Category"value={category} onChange={(e)=>setCategory(e.target.value)} />
            <input type="text" placeholder="Sub-Category"value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} />
            <button type="button" disabled={adding} onClick={updateProduct}>{adding?'Updating ...':'Update'}</button>
        </div>
        </>
    );
}
export default Update;