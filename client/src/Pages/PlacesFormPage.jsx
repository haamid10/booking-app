// import { Navigate } from 'react-router-dom';
import Perks from './Perks';
import PhotosUploader from '../PhotosUploader';
import Navigate from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'
import AcountNav from '../AcountNav';
const PlacesFormPage = () => {
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

const addNewPlace = async(ev) => {
    ev.preventDefault();
   
    await axios.post('/places', {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests
    });
    setRedirect(true);
    
  }
  if(redirect){
    return <Navigate to='/account/places' />
  }
 
    
  return (
    <div>
      <AcountNav/>
        <div className="0 ">
        <h3 className='text-center font-bold text-2xl font-sans'>Add a new place:</h3>
        <form action="" onSubmit={addNewPlace}>
          {headersInput('Title','Title for your place')}
          <input value={title} onChange={ev=> setTitle(ev.target.value)} type="text" placeholder="Title" className=" p-4 my-4 border border-gray-400 rounded-lg " />
          {headersInput('Address',' Address to this place')}
          <input  value={address} onChange={ev=> setAddress(ev.target.value)} type="text" placeholder="Address" className=" p-4 my-4 border border-gray-400 rounded-lg  " />
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