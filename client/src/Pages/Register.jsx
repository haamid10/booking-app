import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
const Register = () => {
    const [name , setName]=useState('');
    const [email , setEmail]=useState('');
    const [password , setPassword]=useState('');
    const [redirect, setRedirect] = useState(false)
    const register = async (e) => {
        e.preventDefault()
        try{

       await axios.post('/register', {
            name, 
            email,
            password,
        })
        alert("you can login now")
        setRedirect(true)
      }  
      catch (e){ alert("registration is failed please try again",e)}    }
    if(redirect){
        return <Navigate to={'/login'}/>
    } 
  return (
    <div className="mt-4 flex  p-12 grow items-center justify-around ">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form action="" className="flex-col bg-gray-400 max-w-md mx-auto" onSubmit={register}>
           <input type="text" placeholder="John Doe" 
                value={name} 
                onChange={e=> setName(e.target.value)} /> 
          <input type="email" placeholder="your@email.com" 
                value={email} 
                onChange={e=> setEmail(e.target.value)}/>
          <input type="password" placeholder="password" 
                value={password} 
                onChange={e=> setPassword(e.target.value)}/>
          <button className="primary">Register</button>
          <div className=" text-center py-2 text-gray-500">
            If you have account  <Link className=" underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
     
    </div>
  )
}

export default Register