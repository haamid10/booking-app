import { Link } from "react-router-dom";
// import PlacesFormPage from "./PlacesFormPage";
import AcountNav from "../AcountNav";

const PlacesPage = () => {

  // const linkClasses =(type =null)=> {
  //   let baseClasses = 'inline-flex gap-2 py-2 px-6 ';
  //   if(type === undefined){
  //     baseClasses += ' bg-primary text-white rounded-full';
      
  //   }
  //   return baseClasses;
  // }

  return (
    <div className=" w-fixed">
      <AcountNav />
    
      <div>
        <div className="text-center">
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