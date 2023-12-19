import { Link,useParams } from "react-router-dom"
const PlacesPage = () => {
  const {action} = useParams()
  // console.log( )
  return (
    <div>
    {action !=='new' && (
      <div>
        <div className="text-center">
            <Link className="inline-flex  bg-primary  text-white py-2 px-6 rounded-full" to={'/account/Places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Add New Place</Link>

        </div>
        </div>
    )}
     {action === 'new' && (
      <div>
        <h3 className='text-center'>Add a new place:</h3>
        <form action="">
          <h2 className="text-xl mt-4">Title</h2>
          <input type="text" placeholder="Title" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <h2 className="text-xl mt-4">Address</h2>
          <input type="text" placeholder="Address" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <h2 className="text-xl mt-4">Photo</h2>
          <input type="text" placeholder="Description" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Image" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Price" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Max Guests" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Phone Number" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Email" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <input type="text" placeholder="Website" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <button className=" p-4 my-4 bg-primary text-white rounded-lg">Submit</button>

        </form>
      </div>
     )}
    </div>
        
       
  )
}

export default PlacesPage