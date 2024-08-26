 //Sin Props como parametro

import React from 'react'
import "./Card.css"

function Card({title="Titulo por Defecto", description="Descripción por defecto"}) {
  return (
    <div className='Card'>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
  )
}

export default Card


/*--Con Props
import React from 'react'
import "./Card.css"

function Card(props) {
  return (
    <div className='Card'>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
    </div>
  )
}

export default Card*/