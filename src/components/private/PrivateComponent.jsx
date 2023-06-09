import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const PrivateComponent = () => {
    const auth = localStorage.getItem('user');
    // if auth contains the user data then show the outlet(means the component wrapped inside the privateroute otherwise we navigate the user)
    return auth ? <Outlet /> : <Navigate to={'/signup'} />;
}
export default PrivateComponent;