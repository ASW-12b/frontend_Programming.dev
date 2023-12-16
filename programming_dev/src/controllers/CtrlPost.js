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

export function editPost(formData,postId) {
  return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`,
            {method: 'PUT',
            mode: 'cors', 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
            },)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
}


export function deletePost(postId) {
  return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f',
            },
          })
          .then(response => response.json())
          .then(data => {
            return data
            }
            )
            .catch(error => {
                console.error('Error making API call:', error);
              });
}


export function createPost(formData) {
  return fetch('https://apiprogrammingdev.onrender.com/posts',
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
            },)
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
}