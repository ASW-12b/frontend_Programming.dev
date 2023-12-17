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
