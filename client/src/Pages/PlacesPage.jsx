import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import axios from "axios";
import { useState, useEffect } from "react";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await axios.get("/places");
      setPlaces(data);
    };
    fetchPlaces();
  }, []);





  return (
    <div className=" w-fixed">
      <AccountNav />
      <div>
        <div className="text-center">
            <Link className="inline-flex  bg-primary  text-white py-2 px-6 rounded-full" to={'/account/Places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Add New Place</Link>
        </div>
        <div className="mt-4">
          {places.length > 0 && places.map(place => (
            <Link to={'/account/places/'+ place._id} key={place.id} className="flex cursor-pointer  gap-4  bg-gray-100 p-4 rounded-xl">
              <div className=" w-32 h-32 bg-gray-300 grow shrink-0" key={place.id}>
              {place.photos.length > 0 &&(
              <img src={place.photos[0]} />
              )
              }
              </div>
             <div  className=" grow-0 shrink">
             <h2 className="text-xl">{place.title}</h2> 
             <p className="text-sm mt-2 ">{ place.description}</p>
             </div>
            
             

             
            </Link>
          ))}
        </div>
        </div>
        
   
 
  </div>
        

  )
}

export default PlacesPage