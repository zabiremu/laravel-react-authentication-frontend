import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'


const AppRouter = () => {
return (
   <>
     <Routes>
         <Route exact path='/' element={<Home/>} />
         <Route exact path='/register' element={<RegisterPage/>} />
         <Route exact path='/dashboard' element={<DashboardPage/>} />
     </Routes>
   </>
)
}

export default AppRouter
