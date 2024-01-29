import {useState} from 'react'
import axios from 'axios'

const PhotosUploader = ({onChange,addedPhotos}) => {
const [photoLink, setPhotoLink] = useState('');


    
async function addPhotoByLink (ev)  {
    ev.preventDefault()
const {data:filename}=await axios.post('/upload-by-link',{link: photoLink});
onChange(prev => {
    return[...prev,filename]
})
setPhotoLink('')
}

async function uploadPhoto  (ev) {
    const files = ev.target.files;

    const data=  new FormData();
    for(let i = 0 ;i < files.length; i++){
    data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
    headers: {
        'Content-type': 'multipart/form-data'
    } 
    }).then(res => {
    const {data: filenames} = res;
    onChange(prev => {
        return[...prev,...filenames]
    })
    }).catch(err => console.log(err))
}
    
return (
    <>
    <div className="flex">
            <input  value={photoLink} onChange={ev=> setPhotoLink(ev.target.value)} type="text" placeholder={'ADD using Link ....jpg'} />
            <button className=" bg-gray-200 px-4 rounded-2xl" onClick={addPhotoByLink}>Add&nbsp;photo</button>
        </div>
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map( (link, index) => (
        <div key={index} className="h-32 flex">
            <img className="rounded-2xl  w-full object-cover" src={'http://localhost:5000/uploads/'+ link} alt="" />
            {/* <p>{link}</p>, */}
        </div>
        ))}
        
        <label className=" cursor-pointer flex gap-1  border bg-transparent rounded-2xl p-4 text-md " >
        <input type="file" multiple className="hidden " onChange={uploadPhoto} />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
        </svg>

            Upload </label>
        
        </div>
    </>
)
}

export default PhotosUploader;