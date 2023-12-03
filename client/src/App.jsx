import {Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Layout from './components/Layout'
import IndexPage from './Pages/IndexPage'
import Register from './Pages/Register'
import  axios  from 'axios'
import { UserContextProvider } from './UserContext'
import { useEffect } from 'react'

axios.defaults.baseURL= 'http://localhost:5000';
axios.defaults.withCredentials= true;

const App = () => {
  useEffect(()=> {
    if(!user){
        axios.get('/profile')
    }
},[])
  return (
   
    <UserContextProvider>
   <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Route>
   </Routes>
   </UserContextProvider>
   
  )
}
export default App