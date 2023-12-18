import { useContext} from 'react'
import { UserContext } from './../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';

const AcountPage = () => {
  const {ready,user}= useContext(UserContext);
   
  let {subpage} = useParams();
   
   
    if(!ready){
      return 'loading...';
    }
    if(ready && !user) return <Navigate to='/login' />
      
    
    if(subpage === undefined){
      subpage = `profile`;
   }
     const linkClasses =(type =null)=> {
        let baseClasses = 'py-2 px-6 ';
        if(type === subpage){
          baseClasses += 'bg-primary text-white rounded-full';
          
        }
        return baseClasses;
     }
    return (
    <div>
      <nav className='w-full m-8 gap-2 justify-center flex'>
        <Link className={linkClasses('profile')} to={'/account'}>Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My booking</Link>
        <Link className={linkClasses('Places')} to={'/account/Places'}>My accommodations </Link>
      </nav>
      {subpage === 'profile' && (
        <div className=' text-center max-w-lg mx-auto'>
          Logged in as {user.name}({user.email}) <br/>
          <button className='primary max-w-sm mt-2'> Logout </button>
        </div>
      )}
      </div>
  )
}

export default AcountPage