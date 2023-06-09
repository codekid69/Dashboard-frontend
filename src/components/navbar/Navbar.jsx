import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem("user");
    useEffect(()=>{
    },[])
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    };
    return (
        <>
            <div className="navbar">
                {auth ? (
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/add"}>Add Prdocuts</Link>
                        </li>
                        {/* <li>
                            <Link to={"/update"}>Update Products</Link>
                        </li> */}
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li style={{color:'white'}}>
                            <Link to={"/signup"} onClick={logout}>
                                Logout
                            </Link>
                            ({JSON.parse(auth).name})
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link to={"/login"}>LogIn</Link>
                        </li>

                        <li>
                            <Link to={"/signup"}>SignUp</Link>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};
export default Navbar;
