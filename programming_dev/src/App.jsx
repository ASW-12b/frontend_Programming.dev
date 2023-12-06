import { useState } from 'react'
import {Layout} from './components/Layout'





function App() {
  const [posts, setPosts] = useState([])
  function getPosts() {
    return fetch('https://apiprogrammingdev.onrender.com/posts')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setPosts(data)
            return data
          })
  }
  return (
    <Layout/>
  )
}

export default App
