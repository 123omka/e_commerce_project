import React from 'react'

const menPage=(id,name,image) => {
  
console.log(id,name,image)
    
  return (
    <div>
     <h1>{id}</h1>
     <h1>{name}</h1>
     <img src={image}/>

    </div>
  )
}

export default menPa