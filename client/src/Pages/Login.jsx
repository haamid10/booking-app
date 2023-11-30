import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import  axios  from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
 const {setUser} = useContext(UserContext)
  const login = async (e) => {
    e.preventDefault()
    try {
      const{data} = await axios.post('/login', {
        email,
        password,
      })
      setUser(data)
      alert("login successful")
      setRedirect(true)
    }
    catch (e) { alert("user or password is wrong is failed, please try again", e) 
  }
  }
  
  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className="mt-4 flex grow items-center justify-around ">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className=" max-w-md mx-auto " onSubmit={login}>
          <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="primary">Login</button>
          <div className=" text-center py-2 text-gray-500">
            If you do not have account yet? <Link className=" underline text-black" to={'/register'}>Register</Link>
          </div>
        </form>
      </div>
     
    </div>
  )}


export default Login