import axios from 'axios';
import React, { useEffect, useState } from 'react'

const App = () => {
  const [items, setItems] = useState();
  useEffect(() => {
    axios.get('/api/items')
    .then(
      res => {
        console.log(res.data);
        setItems(res.data);
      }
    )
    .catch(err => {
      console.log("err -> ",err)
    })
  },[]) 
  return (
    <div>
      aman
    </div>
  )
}

export default App
