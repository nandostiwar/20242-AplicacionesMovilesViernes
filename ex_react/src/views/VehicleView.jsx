import React from 'react'

function VehicleView() {
  return (
    <div>
        <h1>{vehicle.name}</h1>
        <h2>{vehicle.description}</h2>
        <img src={vehicle.image} alt={vehic.image + "image  "} />
    </div>
  )
}

export default VehicleView