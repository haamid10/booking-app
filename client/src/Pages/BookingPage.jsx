import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'
const BookingPage = () => {

  const [bookings , setBookings] = useState('')
  console.log(bookings)

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data)
    })
  })
  return (
    <div>
      <AccountNav/>
      <div>
        <h1>My Bookings are Here </h1>
        {bookings.length > 0 && bookings.map(booking =>(
          <div>
            <h2>{booking.place.title}</h2>
            <p>Check-in: {booking.checkIn}</p>
            <p>Check-out: {booking.checkOut}</p>
            <p>Guests: {booking.guests}</p>
            <p>Price: {booking.price}</p>
          </div>
        )) }
      </div>
    </div>
  )
}

export default BookingPage