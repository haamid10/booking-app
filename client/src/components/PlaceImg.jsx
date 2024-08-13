import React from 'react'

const PlaceImg = ({place , className}) => {
    if(!place.photos?.length){
        return <h1>no photos babi</h1>
    }
    if(!className){
        className ="object cover"
    }
  return (
    <div>
      <img className={className} src={`http://localhost:5000/uploads/`+ place.photos[0]}  alt=""/>
    </div>
  )
}

export default PlaceImg
