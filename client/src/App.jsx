import {Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Layout from './components/Layout'
import IndexPage from './Pages/IndexPage'
import Register from './Pages/Register'
import  axios  from 'axios'

axios.defaults.baseURL= 'http://localhost:5000';

const App = () => {
  return (
    <>
   <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Route>
   </Routes>
   </>
  )
}
export default App