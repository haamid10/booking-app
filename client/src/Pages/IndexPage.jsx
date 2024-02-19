import { useEffect, useState } from "react"
import {Link } from "react-router-dom"
import axios  from "axios"
const IndexPage = () => {
  const [places , setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then((responce) => {
      setPlaces([...responce.data,...responce.data])
    });
    
  },[])
  // console.log(places)
  return (
    <div className="mt-16 gap-y-8 gap-x-6  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx:4 md:mx-6 lg:mx-32 ">
      {
        places.length > 0 && places.map(place => (
          <Link to={'/place/'+ place._id} className=" " >

            <div className="bg-gray-500 rounded-2xl flex mb-2">
            {place.photos?.[0]   && (
              <img className=" rounded-2xl object-cover aspect-square " src={`http://localhost:5000/uploads/` + place.photos[0]} alt="" />
            )}
            </div>
            <h1 className="text-sm truncate leading-4">{place.title}</h1>
            <h1 className="font-bold leading-4">{place.address}</h1>
            <div className="mt-1">
              <span className="text-sm font-bold text-black">{place.price} $</span> per night
            </div>
            </Link>
        ))
      }
    </div>
  )
}

export default IndexPage