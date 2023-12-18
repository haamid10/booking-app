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
      console.log(subpage);
    return (
    <div>
      <nav className='w-full m-8 gap-2 justify-center flex'>
        <Link className='py-2 px-6 bg-primary text-white rounded-full' to={'/account'}>Profile</Link>
        <Link className='py-2 px-6 ' to={'/account/bookings'}>My booking</Link>
        <Link className='py-2 px-6' to={'/account/Places'}>My places</Link>
      </nav>
      </div>
  )
}

export default AcountPage