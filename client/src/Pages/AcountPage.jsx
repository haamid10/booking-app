import { useContext, useState} from 'react'
import { UserContext } from './../UserContext';
import {  Navigate, useParams } from 'react-router-dom';
import  axios from 'axios';
import PlacesPage from './PlacesPage';

const AcountPage = () => {
  const [redirect , setRedirect] = useState(null)
  const {ready,user, setUser}= useContext(UserContext);
   
  let {subpage} = useParams();
    
  if(subpage === undefined){
    subpage = `profile`;
  }

  const logOut =async () => {
    await axios.post('/logout');
    setUser(null)
    setRedirect('/')
  }
  if(redirect){
    return<Navigate to={redirect} />;
   }


    if(!ready){
      return 'loading...';
    }
    if(ready && !user) return <Navigate to='/login' />
      
   
    //  const linkClasses =(type =null)=> {
    //     let baseClasses = 'inline-flex gap-2 py-2 px-6 ';
    //     if(type === subpage){
    //       baseClasses += ' bg-primary text-white rounded-full';
          
    //     }
    //     return baseClasses;
    //  }
     
    return (
    <div>
      
      {subpage === 'profile' && (
        <div className=' text-center max-w-lg mx-auto'>
          Logged in as {user.name}({user.email}) <br/>
          <button onClick={logOut} className='primary max-w-sm mt-2'> Logout </button>
        </div>
      )}
      {subpage === 'Places' && (
        <div>
          <PlacesPage/>
        </div>
      )}
      </div>
  )
}

export default AcountPage