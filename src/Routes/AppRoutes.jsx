import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../Pages/Login'
import AllUser from "../Pages/AllUser";
import { Navigate } from "react-router";
import EditUser from "../Pages/EditUser";
import LandingLayout from "../Layout/LandingLayout";


const AppRoutes = () => {

  const login = localStorage.getItem('token');
  // const {login,setLogin} = useState(localStorage.getItem('token'));
  console.log(login)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={login?<Navigate to="/"/>:<Login />} />

        {/* for all routes  */}
        <Route path="*" element={login?<Navigate to="/"/>:<Navigate to="/login"/>}/>


        {/* Access this routes only after login  */}
        <Route element={login ? <LandingLayout /> : <Navigate to='/login' />}>
          <Route path="/" element={<AllUser />} />
          <Route path={`/edit/:id`} element={<EditUser />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
