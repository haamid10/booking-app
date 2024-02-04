import { Link } from "react-router-dom";
import AcountNav from "../AcountNav";
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
      <AcountNav />
      <div>
        <div className="text-center">
            List of all added places <br/>
            <Link className="inline-flex  bg-primary  text-white py-2 px-6 rounded-full" to={'/account/Places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Add New Place</Link>
        </div>
        </div>
        
   
 
  </div>
        

  )
}

export default PlacesPage