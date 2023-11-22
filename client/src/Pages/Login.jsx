import { Link } from "react-router-dom"
const Login = () => {
  return (
    <div className="mt-4 flex grow items-center justify-around ">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className=" max-w-md mx-auto ">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="primary">Login</button>
          <div className=" text-center py-2 text-gray-500">
            If you dont have account yet? <Link className=" underline text-black" to={'/register'}>Register</Link>
          </div>
        </form>
      </div>
     
    </div>
  )}


export default Login