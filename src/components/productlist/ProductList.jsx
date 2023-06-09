import React, { useEffect, useState } from "react";
import "./productlist.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
const ProductList = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
        setLoading(false);
    }, []);

    const fetchProduct = async () => {
        let response = await fetch(` https://dashboardapi.onrender.com/products`);
        let data = await response.json();
        // console.log("dataa", data);
        setProduct(data);
    };

    const deleteProduct = async (id) => {
        let response = await fetch(` https://dashboardapi.onrender.com/product/${id}`, {
            method: "DELETE",
        });
        let data = await response.json();
        if (data) {
            fetchProduct();
            // alert("data deleted ");
        }
    };

    const searcHandle = async (e) => {
        let key = e.target.value;
        if(key){
            setLoading(true);
            let result = await fetch(` https://dashboardapi.onrender.com/search/${key}`);
            result = await result.json();
            setLoading(false);
            if (result) {
                setProduct(result);
            }
        }else{
            fetchProduct();
        }
    };

    return (
        <>
            <div className="product-list">
                <h1>Product List</h1>
                <input
                    type="text"
                    placeholder="search product..."
                    onChange={searcHandle}
                />
                <ul>
                    <li>S.no</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    <li>Sub-category</li>
                    <li>Operation</li>
                </ul>
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    <>
                        {product.length>0 ? (
                            product.map((p, index) => {
                                return (
                                    <ul key={index}>
                                        <li>{index + 1}</li>
                                        <li>{p.name}</li>
                                        <li>&#8377; {p.price}</li>
                                        <li>{p.category}</li>
                                        <li>{p.subcategory}</li>
                                        <li>
                                            <button
                                                onClick={() => deleteProduct(p._id)}
                                                style={{ marginRight: "10px" }}
                                            >
                                                Delete
                                            </button>
                                            <button>
                                                <Link
                                                    to={`/update/${p._id}`}
                                                    style={{ textDecoration: "none", color: "black" }}
                                                >
                                                    Update
                                                </Link>
                                            </button>
                                        </li>
                                    </ul>
                                );
                            })
                        ) : (
                            <h1>No Result Found</h1>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
export default ProductList;
