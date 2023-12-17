import { useContext} from 'react'
import { UserContext } from './../UserContext';
import { Navigate } from 'react-router-dom';

const AcountPage = () => {
    const {ready,user}= useContext(UserContext);
    if(!ready){
      return <div>loading...</div>
    }

    if(ready && !user) return <Navigate to='/login' />
  return (
    <div>AcountPage for {user?.name}</div>
  )
}

export default AcountPage