import {Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Layout from './components/Layout'
import IndexPage from './Pages/IndexPage'
import Register from './Pages/Register'
import  axios  from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './Pages/ProfilePage'
import PlacesPage from './Pages/PlacesPage'
import PlacesFormPage from './Pages/PlacesFormPage'
import Hotels from './Pages/Hotels'

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
        <Route path='/account' element={<ProfilePage/>}/>
        <Route path='/account/places' element={<PlacesPage/>}/>
        <Route path='/account/places/new' element={<PlacesFormPage/>}/>
        <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
        <Route path='/place/:id' element={<Hotels/>}/>
        
      </Route>

   </Routes>
   </UserContextProvider>
   
  )
}
export default App