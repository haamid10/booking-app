import {Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Layout from './components/Layout'
import IndexPage from './Pages/IndexPage'
const App = () => {
  return (
    <>
   <Routes>
    
      <Route path='/' element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<Login/>} />
      </Route>
   </Routes>
   </>

     
    
  )
}

export default App