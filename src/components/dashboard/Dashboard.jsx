import React from 'react'
// import Navigate from react-router-dom for redirect other page
import { Navigate } from "react-router-dom";

const Dashboard = () => {
// get csrf token from session to check user is login or logout
  const crfToken = sessionStorage.getItem('csrfToken');
// if csrf token not found then redirect for home page
  if(!crfToken)
  {
   return <Navigate to={'/'}></Navigate>; 
  }
// logic end here
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard