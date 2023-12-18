import { useContext} from 'react'
import { UserContext } from './../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';

const AcountPage = () => {

    const {ready,user}= useContext(UserContext);
    if(!ready){
      return 'loading...';
    }
    if(ready && !user) return <Navigate to='/login' />
      
     const {subpage} = useParams();

     const linkClasses =(type =null)=> {
        const baseClasses = 'py-2 px-6 ';
        const activeClasses = 'bg-primary text-white rounded-full';
        return type === subpage ||subpage ===undefined && type ==='profile'  ? `${baseClasses} ${activeClasses}` : baseClasses;
     }
    return (
    <div>
      <nav className='w-full m-8 gap-2 justify-center flex'>
        <Link className={linkClasses('profile')} to={'/account'}>Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My booking</Link>
        <Link className={linkClasses('Places')} to={'/account/Places'}>My places</Link>
      </nav>
      </div>
  )
}

export default AcountPage