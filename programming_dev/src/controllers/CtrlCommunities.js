export async function getCommunities() {
    return fetch('https://apiprogrammingdev.onrender.com/communities',
    {method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
    },)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            return data
          })
}