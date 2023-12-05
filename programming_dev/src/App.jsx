import { useState } from 'react'
import './App.css'


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
