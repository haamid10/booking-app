import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
const Hotels = () => {
    const {id} = useParams();
    const [places , setPlaces] = useState([])
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
    // console.log(places)
  return (
    <div className='mt-4 pt-4 bg-gray-100  -mx-8 px-8'>
        <h1 className=' text-3xl'> {places.title}</h1>
        <a className='my-2 block underline font-semibold' target='_blank' href={'https://maps.google.com/?q='+ places.address}>{places.address}</a>
        <div className="grid gap-2  grid-cols-[2fr_1fr]">
            <div>
                {places.photos?.[0] &&(
                    <div>
                        <img className='aspect-square object-cover' src={'http://localhost:5000/uploads/'+ places.photos[0]} alt="" />
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

    </div>
  )
}

export default Hotels