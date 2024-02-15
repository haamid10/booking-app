import { useEffect, useState } from "react"
import axios  from "axios"
const IndexPage = () => {
  const [places , setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then((responce) => {
      setPlaces([...responce.data,...responce.data])
    });
    
  },[])
  console.log(places)
  return (
    <div className="mt-16  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx:4 md:mx-6 lg:mx-32 ">
      {
        places.length > 0 && places.map(place => (
          <div key={place.id}>
             
            <div className="bg-gray-500 rounded-2xl flex">
            {place.photos?.[0]   && (
              <img className=" rounded-2xl object-cover aspect-square " src={`http://localhost:5000/uploads/` + place.photos[0]} alt="" />
            )}
            </div>
            
            <h1 className="text-md">{place.title}</h1>
            <h1 className="font-bold">{place.address}</h1>
            </div>
          // litle bit                                                     

            
         
        ))
      }
    </div>
  )
}

export default IndexPage