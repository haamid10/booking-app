// import { Navigate } from 'react-router-dom';
import Perks from './Perks';
import PhotosUploader from '../PhotosUploader';
import {Navigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios'
import AccountNav from '../AccountNav';
import { useParams } from 'react-router-dom';
const PlacesFormPage = () => {
  const {id} = useParams();
  // console.log({id});
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect , setRedirect] = useState(false)
    const [price, setPrice] = useState('');

    useEffect(()=> {
      if(!id) {
        return;
      }
      axios.get('/places/'+ id).then(response => {
        const {data} = response;
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setAddedPhotos(data.photos);
        setPrice(data.price);
      
      })

    }, [id])



    const titleDeclaration = (text) =>{
        return (
        <h2 className="text-xl mt-4">{text}</h2>
        );
      }
      const descDeclaration = (text) => {
        return (
        <p className="text-gray-500 mt-4">{text}</p>
        );
      }

      const headersInput =  (header,description) => {
        return(
        <>
        {titleDeclaration(header)}
        {descDeclaration(description)}
        </>
        )
    }

const saveNewPlace = async(ev) => {
    ev.preventDefault();
    const placeData = { title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    }

    if(id){
      // update 
      await axios.put('/places', {id, ...placeData});
      setRedirect(true);
    }
    else{
      // new place
      await axios.post('/places', placeData);
      setRedirect(true);
    }

}

  
  if(redirect){
    return <Navigate to='/account/places' />
  }
 
    
  return (
    <div>
      <AccountNav />
        <div className="0  mx-44">
        <h3 className='text-center font-bold text-2xl font-sans'>Add a new place:</h3>
        <form action="" onSubmit={saveNewPlace}>
          {headersInput('Title','Title for your place')}
          <input value={title} onChange={ev=> setTitle(ev.target.value)} type="text" placeholder="Title" className=" p-4 my-4 border border-gray-400 rounded-lg " />
          {headersInput('Address',' Address to this place')}
          <input  value={address} onChange={ev=> setAddress(ev.target.value)} type="text" placeholder="Address" className=" p-4 my-4 border border-gray-400 rounded-lg  " />
          {headersInput('price',' price to this place')}
          <input  value={price} onChange={ev=> setPrice(ev.target.value)} type="number" placeholder="Address" className=" p-4 my-4 border border-gray-400 rounded-lg  " />
          {headersInput('Photos','more = photos')}
          <PhotosUploader onChange={setAddedPhotos} addedPhotos={addedPhotos}/>
          {headersInput('Description','description of the place')}
          <textarea  value={description} onChange={ev=> setDescription(ev.target.value)} name="" id=""  />
          <Perks selected={perks} onChange={setPerks} />
          
          {headersInput('Extra Info','house rules and etc')}
          <textarea  value={extraInfo} onChange={ev=> setExtraInfo(ev.target.value)} name="" id=""  />
          {headersInput('Check in&out','add check in and out times , remember to have some time window for cleaning between guests')}
          <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className=" mt-2 -mb-2 ">check in time</h3>
            <input value={checkIn} onChange={ev => setCheckIn(ev.target.value)} type="text" placeholder="14" />
          </div>
          <div>
            <h3 className=" mt-2 -mb-2 ">check in time</h3>
            <input value={checkOut} onChange={ev => setCheckOut(ev.target.value)} type="text" placeholder="11" />
          </div>
          <div>
            <h3 className=" mt-2 -mb-2 ">Max number of guests</h3>
            <input value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="" />
          </div>
         </div>
         <button className="primary my-4">Save</button>

        </form>
      </div>
    </div>
  )
}

export default PlacesFormPage