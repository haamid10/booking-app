import { useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
const BookingWidget = ({places}) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)
    const [name , setName] = useState("")
    const [mobile , setMobile] = useState("")

    let numberOfNights = 0;
    if(checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }
  return (
    <div>
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
                           <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                       </div>
                       <div className='     py-3 px-4 border-l'>
                           <label>Check out:</label>
                           <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                       </div>

                   </div>
                   <div>
                   <div className='     py-3 px-4 border-t'>
                        <label>Number of guests:</label>
                        <input type="number" value={guests} onChange={ev => setGuests(ev.target.value) }/>
                    </div>
                    {numberOfNights >0 && (
                        <div className='     py-3 px-4 border-t'>
                        <label>Enter Your Full-name:</label>
                        <input type="number" value={name} onChange={ev => setName(ev.target.value) }/>
                        <label>Enter Your Phone Number :</label>
                        <input type="tele" value={mobile} onChange={ev => setMobile(ev.target.value) }/>
                    </div>

                    )}

                   </div>
               </div>
              
            <button className='primary mt-2' >

                Book this place
                {numberOfNights > 0 &&(
                    <span> ${numberOfNights * places.price}</span>
                )}
                
            </button>

           </div>
           </div>
    </div>
  )
}

export default BookingWidget