import { useEffect, useState } from "react"
import axios  from "axios"
const IndexPage = () => {
  const [places , setPlaces] = useState([])
  useEffect(() => {
    axios.get('/places').then((responce) => {
      setPlaces(responce.data)
    });
    
  },[])
  console.log(places)
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {
        places.length > 0 && places.map(place => (
          <div className=" " key={place.id}>
             
            
              {place.photos?.[0]   && (
              <img className="w-32 rounded-2xl" src={`http://localhost:5000/uploads/` + place.photos[0]} alt="" />
            )}
            <h1>{place.title}</h1>
            <h1>{place.address}</h1>
            </div>
          // litle bit                                                     

            
         
        ))
      }
    </div>
  )
}

export default IndexPage