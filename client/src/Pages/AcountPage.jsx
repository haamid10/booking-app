import { useContext, useState} from 'react'
import { UserContext } from './../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
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
      
   
     const linkClasses =(type =null)=> {
        let baseClasses = 'inline-flex gap-2 py-2 px-6 ';
        if(type === subpage){
          baseClasses += ' bg-primary text-white rounded-full';
          
        }
        return baseClasses;
     }
     
    return (
    <div>
      <nav className='w-fixed m-8 gap-2 justify-center flex'>
        <Link className={linkClasses('profile')} to={'/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
          Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
        </svg>

          My booking</Link>
        <Link className={linkClasses('Places')} to={'/account/Places'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>

          My accommodations </Link>
      </nav>
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