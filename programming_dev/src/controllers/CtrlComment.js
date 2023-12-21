export async function deleteComment(commentId) {
    return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f'
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


export async function editComment(commentId,content) {
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}`, {
            method: 'PUT',
            mode: 'cors', 
            body: JSON.stringify({'contingut': content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
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


export async function replyComment(commentId,content) {
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}/reply`, {
            method: 'POST',
            mode: 'cors', 
            body: JSON.stringify({'contingut': content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
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

export async function getVotesComment() {
  return fetch(`https://apiprogrammingdev.onrender.com/user/adrian.contreras.martin/votes/comments`,
            {method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
            },)
            .then(response => response.json())
            .then(data => {
                if (data.message) return {}
                console.log(data)
                const mapa = data.reduce((acc, obj) => {
                  acc[obj.commentId] = obj;
                  return acc;
                }, {});
                return mapa
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
}

export async function voteComment(commentId,type) {
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}/vote`,
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify({'typeV': type}),
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

export async function getLikesComment() {
  return fetch(`https://apiprogrammingdev.onrender.com/user/adrian.contreras.martin/likes/comments`,
            {method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'3ed9e367-519d-4435-8b35-c15d829e528f'
            }
            },)
            .then(response => response.json())
            .then(data => {
                if (data.message) return {}
                console.log(data)
                const mapa = data.reduce((acc, obj) => {
                  acc[obj.commentId] = obj;
                  return acc;
                }, {});
                return mapa
            })
            .catch(error => {
                console.error('Error al enviar la solicitud:', error);
              });
}

export async function LikeComment(commentId,type) {
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}/like`,
            {method: 'POST',
            mode: 'cors', 
            body: JSON.stringify({'typeV': type}),
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
