import React, { useState } from "react";
const Product=()=>{
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [subCategory,setSubCategory]=useState('');
    const [adding,setAdding]=useState(false);
    const clearForm=()=>{
        setName('');
        setPrice('');
        setCategory('');
        setSubCategory('');
    }
    const addProduct=async()=>{
        setAdding(true);
        if(!name||!price||!category||!subCategory){
            alert("Please Fill all the feilds");
            setAdding(false);
            return;
        }
        const userId=JSON.parse(localStorage.getItem('user')).id;
        let response=await fetch(` https://dashboardapi.onrender.com/add-product`,{
            method:'POST',
            body:JSON.stringify({name,price,category,subcategory:subCategory,userId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response=await response.json();
        clearForm();
        setAdding(false);
    }
    return(
        <>
        <h1>Add Product</h1>
        <div className="form">
            <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="Price"value={price} onChange={(e)=>setPrice(e.target.value)} />
            <input type="text" placeholder="Category"value={category} onChange={(e)=>setCategory(e.target.value)} />
            <input type="text" placeholder="Sub-Category"value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} />
            <button type="button" disabled={adding} onClick={addProduct}>{adding?'Adding ...':'Add'}</button>
        </div>
        </>
    );
}
export default Product;