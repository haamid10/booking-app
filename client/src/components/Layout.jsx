import Header from "./Header"
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col h-screen">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout