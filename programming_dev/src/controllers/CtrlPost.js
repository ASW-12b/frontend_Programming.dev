export function getPost(postId) {
    return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f',
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return data
        }
        )
        .catch(error => {
            console.error('Error making API call:', error);
          });
  }