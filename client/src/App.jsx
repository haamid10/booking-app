import {Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Layout from './components/Layout'
import IndexPage from './Pages/IndexPage'
import Register from './Pages/Register'
import  axios  from 'axios'
import { UserContextProvider } from './UserContext'
import AcountPage from './Pages/AcountPage'

axios.defaults.baseURL= 'http://localhost:5000';
axios.defaults.withCredentials= true;

const App = () => {

  return (
   
    <UserContextProvider>
   <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/account/:subpage?' element={<AcountPage/>}/>
        <Route path='/account/:subpage/:action' element={<AcountPage/>}/>
        
      </Route>

   </Routes>
   </UserContextProvider>
   
  )
}
export default App