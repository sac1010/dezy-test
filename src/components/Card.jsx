import React from 'react'

const Card = ({name, imageUrl}) => {
  return (
    <div style={{width:"30%", height:"200px", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {name}
    </div>
  )
}

export default Card