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
    <div>IndexPage
      {
        places.length > 0 && places.map(place => (
          <div className=" w-[400px] mx-44 mt-12 bg-blue-50 p-4 flex flex-col gap-x-12" key={place.id}>
              <div>
            {place.photos.length > 0 && (
              <img className="w-76 rounded-2xl" src={`http://localhost:5000/uploads/` + place.photos[0]} alt="" />
            )}
            </div>
            <div>
            <h1>{place.title}</h1>
            <h1>{place.address}</h1>
            <h1>{place.description}</h1>
            </div>
          

            
          </div>
        ))
      }
    </div>
  )
}

export default IndexPage