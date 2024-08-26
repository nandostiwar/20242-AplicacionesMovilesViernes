import React, { useState } from 'react'

function ShowHide() {

    const [show, setShow] = useState(true);
    const handleClick = (event) =>{
        setShow(!show);
    }

  return (
    <div>
         <button onClick={handleClick}>{show ? "Hide": "Show" } Text</button>
        {show && <h2>Hide me!</h2>}
    </div>
  )
}

/*
  return (
    <div>
        {show ? <h2>Hide me!</h2> : ""}
    </div>
  )
}
*/

export default ShowHide