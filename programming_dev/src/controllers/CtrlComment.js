import {getTokenAndUser} from "./CtrlUsers.js";

export async function deleteComment(commentId) {
    const { token, selectedUser } = getTokenAndUser();
    return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}`, {
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


export async function editComment(commentId,content) {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}`, {
            method: 'PUT',
            mode: 'cors', 
            body: JSON.stringify({'contingut': content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}/reply`, {
            method: 'POST',
            mode: 'cors', 
            body: JSON.stringify({'contingut': content}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
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
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/user/${selectedUser}/votes/comments`,
            {method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
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
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}/vote`,
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

export async function getLikesComment() {
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/user/${selectedUser}/likes/comments`,
            {method: 'GET',
            mode: 'cors', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization':token
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
    const { token, selectedUser } = getTokenAndUser();
  return fetch(`https://apiprogrammingdev.onrender.com/comments/${commentId}/like`,
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
