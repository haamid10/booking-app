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
        <h1 className=' text-2xl'> {places.title}</h1>
        <a target='_blank' href={'https://maps.google.com/?q='+ places.address}>{places.address}</a>

    </div>
  )
}

export default Hotels