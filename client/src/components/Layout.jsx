import Header from "./Header"
import {Outlet} from 'react-router-dom'

const Layout = () => {
  return (
    <div className="pb-12">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout