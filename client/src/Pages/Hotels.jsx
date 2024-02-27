import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import BookingWidget from './BookingWidget';
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
                    <button className=' fixed top-8 right-12  shadow-lg shadow-grey-500 bg-gray-300 pt-2 px-4 rounded-2xl' onClick={()=>setShowAll(false)}>close Photos</button>
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
    <div className='mt-4 pt-4 bg-gray-50 h-fit -mx-8 px-8'>
        <h1 className=' text-3xl'> {places.title}</h1>
        <a className='my-2 block underline font-semibold' target='_blank' href={'https://maps.google.com/?q='+ places.address}>{places.address}</a>
        <div className='relative'>
        <div className="grid gap-2  grid-cols-[2fr_1fr]">
            <div>
                {places.photos?.[0] &&(
                    <div>
                        <img onClick={() => setShowAll(true)} className='' src={'http://localhost:5000/uploads/'+ places.photos[0]} alt="" />
                    </div>
                )}
            </div>
            <div className="grid gap-2 ">
                {places.photos?.[1] &&(
                        <img onClick={() => setShowAll(true)} className='' src={'http://localhost:5000/uploads/'+ places.photos[1]} alt="" />
                )}
            <div>
            {places.photos?.[2] &&(
                        <img onClick={() => setShowAll(true)} className='' src={'http://localhost:5000/uploads/'+ places.photos[2]} alt="" />
                )}
            </div>
            </div>

        </div>
        <button onClick={()=> setShowAll(true)} className=' absolute bottom-2 right-2  shadow-lg shadow-grey-500 bg-white py-2 px-4 rounded-2xl'>Show more photos</button>

        </div>
        <div>
        <BookingWidget places={places}/>
        </div>
        <div className=' bg-white -mx-8 px-8 pt-6 border-t'>
            <h2 className=' font-semibold text-2xl'>  Extra Info</h2>
        <div className='-mx-8  px-8 shadow leading-5 py-4 w-[900px]  rounded-2xl my-4  text-sm text-gray-700 '>{places.extraInfo}</div>
        </div>

        </div>

  
  )
}

export default Hotels