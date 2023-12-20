import { Link,useParams } from "react-router-dom"
const PlacesPage = () => {
  const {action} = useParams()
  // console.log( )
  return (
    <div className=" w-fixed">
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
          <p className="text-gray-500 mt-4"> Title for your place</p>
          <input type="text" placeholder="Title" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <h2 className="text-xl mt-4">Address</h2>
          <p className="text-gray-500 mt-4"> Address to this place</p>
          <input type="text" placeholder="Address" className=" p-4 my-4 border border-gray-400 rounded-lg focus:outline-none focus:border-primary" />
          <h2 className="text-xl mt-4">Photos</h2>
          <p className="text-gray-500 mt-4"> more = better</p>
          <div className="flex">
            <input type="text" placeholder={'ADD using Link ....jpg'} />
            <button className=" bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
          </div>
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <button className="flex gap-1  border bg-transparent rounded-2xl p-4 text-md " >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>

            Upload </button>
          </div>
          <h2 className="text-xl mt-4">Description</h2>
          <p className="text-gray-500 mt-4"> description of the place</p>
          <textarea name="" id=""  />
          <h2 className="text-xl mt-4">perks</h2>
          <p className="text-gray-500 mt-4"> select all the perks of the place</p>
           <div>
            <label htmlFor="">
              <input type="checkbox" />
              <span>Wifi</span>
            </label>
           </div>
          

        </form>
      </div>
     )}
    </div>
        
       
  )
}

export default PlacesPage