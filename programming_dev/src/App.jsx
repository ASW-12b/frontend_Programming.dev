import { useState } from 'react'
import './App.css'
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
    <>
    <Layout/>
      <button onClick={getPosts}>Clica aqui</button>
      <div>
        {posts.map(p => (
          <div key={p.pk}>
            <p>{p.fields.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
