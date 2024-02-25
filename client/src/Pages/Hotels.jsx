import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
const Hotels = () => {
    const {id} = useParams();
    const [places , setPlaces] = useState([])
    const [showAll , setShowAll] = useState(false)
    useEffect(()=> {
        if(!id){
            return  
        }

        axios.get('/places/'+id).then((responce) => {
            setPlaces(responce.data)
        })


    },[id])

    if(!places){
        return <h1>Loading...</h1>
    }
    if(showAll){
        return(
            <div className=' absolute bg-white inset-0 min-h-screen'>
                <div>
                    <button className=' fixed top-8 right-12  shadow-lg shadow-grey-500 bg-gray-300 py-2 px-4 rounded-2xl' onClick={()=>setShowAll(false)}>close Photos</button>
                </div>
            {
                places?.photos?.length && places.photos.map(photo => (
                    <div className=' flex flex-col justify-center items-center  object-cover p-4 '>
                    <img className='w-[1180px]' src={`http://localhost:5000/uploads/` + photo} alt="" />
                    </div>
                ))
            }</div>
        )
    }
   
    // console.log(places)
  return (
    <div className='mt-4 pt-4 bg-gray-100 h-fit -mx-8 px-8'>
        <h1 className=' text-3xl'> {places.title}</h1>
        <a className='my-2 block underline font-semibold' target='_blank' href={'https://maps.google.com/?q='+ places.address}>{places.address}</a>
        <div className='relative'>
        <div className="grid gap-2  grid-cols-[2fr_1fr]">
            <div>
                {places.photos?.[0] &&(
                    <div>
                        <img className='' src={'http://localhost:5000/uploads/'+ places.photos[0]} alt="" />
                    </div>
                )}
            </div>
            <div className="grid gap-2 ">
                {places.photos?.[1] &&(
                        <img className='' src={'http://localhost:5000/uploads/'+ places.photos[1]} alt="" />
                )}
            <div>
            {places.photos?.[2] &&(
                        <img className='' src={'http://localhost:5000/uploads/'+ places.photos[2]} alt="" />
                )}
            </div>
            </div>

        </div>
        <button onClick={()=> setShowAll(true)} className=' absolute bottom-2 right-2  shadow-lg shadow-grey-500 bg-white py-2 px-4 rounded-2xl'>Show more photos</button>

        </div>
       
           
            <div className='mt-8 gap-12 grid grid-cols-2 lg:grid-cols-[2fr_1fr]'>
               
                <div className='my-4'>
                <h2 className='font-semibold text-2xl'>Description</h2>
                <p>{places.description}</p>
                <div>
                Check-in {places.checkIn} <br/>
                Check-Out {places.checkOut} <br/>
                Max number of guests:{places.maxGuests} 
                </div>
                </div>
                
                
               
            
            <div className='bg-white    shadow-xl p-4 rounded-2xl w-[400px]'>
                <div className='text-2xl text-center'>
                    Price: ${places.price}  / Per night
                </div>
                <div className="border rounded-2xl mt-4">
                    <div className="flex">
                        <div className='    py-3 px-4  '>
                            <label>Check in:</label>
                            <input type="date" />
                        </div>
                        <div className='     py-3 px-4 border-l'>
                            <label>Check in:</label>
                            <input type="date" />
                        </div>

                    </div>
                    <div>
                    <div className='     py-3 px-4 border-t'>
                            <label>Number of guests:</label>
                            <input type="number" />
                        </div>
                    </div>
                
                </div>
               
                <button className='primary mt-2' >Book this place </button>

            </div>
            </div>

        </div>

  
  )
}

export default Hotels