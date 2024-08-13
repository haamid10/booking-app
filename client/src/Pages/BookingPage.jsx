import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'
const BookingPage = () => {

  const [bookings , setBookings] = useState('')

  useEffect(() => {
    axios.get('/bookings').then(response => {
      console.log(response.data)
      setBookings(response.data)
    })
  })
  return (
    <div>
      <AccountNav/>
      <div>
        <h1>My Bookings are Here </h1>
        {}
      </div>
    </div>
  )
}

export default BookingPage