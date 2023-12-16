export function getCommentsByPostId(postId) {
    return fetch(`https://apiprogrammingdev.onrender.com/posts/${postId}/comments`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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