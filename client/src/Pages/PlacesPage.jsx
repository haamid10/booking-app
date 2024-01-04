import { Link,useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios"
import { useState } from "react";
const PlacesPage = () => {
  const {action} = useParams()

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);


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

 async function addPhotoByLink (ev)  {
  ev.preventDefault()
 const {data:filename}=await axios.post('/upload-by-link',{link: photoLink});
 setAddedPhotos(prev => {
  return[...prev,filename]
 })
 setPhotoLink('')
}
const uploudPhoto = (ev) => {
  const files = ev.target.value;
  console.log({files})

  const data=  new FormData();
  data.set('photos', files);
  axios.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    const {data: filename} = res;
    setAddedPhotos(prev => {
      return[...prev,filename]
     })
    console.log(data);
  }).catch(err => console.log(err))
  
  

}
  return (
    <div className=" w-fixed">
    {action !=='new' && (
      <div>
        <div className="text-center">
            <Link className="inline-flex  bg-primary  text-white py-2 px-6 rounded-full" to={'/account/Places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Add New Place</Link>

        </div>
        </div>
    )}
     {action === 'new' && (
      <div className="0 ">
        <h3 className='text-center font-bold text-2xl font-sans'>Add a new place:</h3>
        <form action="">
          {headersInput('Title','Title for your place')}
          <input value={title} onChange={ev=> setTitle(ev.target.value)} type="text" placeholder="Title" className=" p-4 my-4 border border-gray-400 rounded-lg " />
          {headersInput('Address',' Address to this place')}
          <input  value={address} onChange={ev=> setAddress(ev.target.value)} type="text" placeholder="Address" className=" p-4 my-4 border border-gray-400 rounded-lg  " />
          {headersInput('Photos','more = photos')}
          <div className="flex">
            <input  value={photoLink} onChange={ev=> setPhotoLink(ev.target.value)} type="text" placeholder={'ADD using Link ....jpg'} />
            <button className=" bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;photo</button>
          </div>
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 && addedPhotos.map( (link, index) => (
            <div key={index} >
              <img className="rounded-2xl mr-2" src={'http://localhost:5000/uploads/'+ link} alt="" />
              {/* <p>{link}</p>, */}
            </div>
          ))}
          
          <label className=" cursor-pointer flex gap-1  border bg-transparent rounded-2xl p-4 text-md " >
          <input type="file" className="hidden" onChange={uploudPhoto} />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" dataSlot="icon" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
          </svg>

            Upload </label>
          
          </div>
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
     )}
  </div>
        
       
  )
}

export default PlacesPage