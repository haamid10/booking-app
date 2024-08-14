import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
const BookingPage = () => {

  const [bookings , setBookings] = useState('')
  // console.log(bookings)

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data)
    })
  },[])
  return (
    <div>
      <AccountNav/>
      <div>
        {bookings.length > 0 && bookings.map(booking =>(
          <div className=' flex gap-12   bg-gray-100 rounded-2xl overflow-hidden '>
            <div className='w-48  '>
           <PlaceImg place={booking.place}/>
            </div>
            <div className=' pr-3 grow'>
            <h2 className='text-xl font-bold'>{booking.place.title}</h2>
            <div className='text-xl font-semibold font-sans border-t border-gray-300 mt-2 py-2 '>
            {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; 
            {format(new Date(booking.checkOut), 'yyyy-MM-dd')} 

            <p className='text-xl font-semibold font-sans'>{differenceInCalendarDays(new Date(booking.checkIn), new Date(booking.checkOut))} nights | Price: {booking.price}</p>

            </div>
            
            </div>
            

          </div>
        )) }
      </div>
    </div>
  )
}

export default BookingPage