import {getTokenAndUser} from "./CtrlUsers.js";

export async function getPost(postId) {
    const { token, selectedUser } = getTokenAndUser();
    return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
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

export async function editPost(formData,postId) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`,
            {method: 'PUT',
            mode: 'cors', 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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


export async function deletePost(postId) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
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


export async function createPost(formData) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch('https://apiprogrammingdev.onrender.com/posts',
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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

export async function comment(content,postId) {
    const { token, selectedUser } = getTokenAndUser();
    return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}/comment`,
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify({'comentari': content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
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

export async function getVotePost(postId) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/user/${selectedUser}/votes/posts/${postId}`,
            {method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
            },)
            .then(response => response.json())
            .then(data => {
                if (data.message) return {}
                return data
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
}

export async function votePost(postId,type) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}/vote`,
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify({'typeV': type}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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

export async function getLikePost(postId) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/user/${selectedUser}/likes/posts/${postId}`,
            {method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
            },)
            .then(response => response.json())
            .then(data => {
                if (data.message) return false
                return true
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
}

export async function likePost(postId) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}/like`,
            {method: 'POST',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
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

