import React from 'react'

const SearchCard = ({name, abilities }) => {
  return (
    <div style={{width:"30%", height:"200px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#D3D3D3" }}>
      <div>{name}</div>
      <div>
        abilities : {abilities.map((ability)=>ability.ability.name).join(",")}
      </div>
    </div>
  )
}

export default SearchCard