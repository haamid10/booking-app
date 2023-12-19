import { Link,useParams } from "react-router-dom"
const PlacesPage = () => {
  const {action} = useParams()
  console.log(action)
  return (
    <div>
        <div className="text-center">
            <Link className="inline-flex  bg-primary  text-white py-2 px-6 rounded-full" to={'/account/Places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Add New Place</Link>
       
        </div>
        
        PlacesPage</div>
  )
}

export default PlacesPage