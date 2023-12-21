import {getTokenAndUser} from "./CtrlUsers.js";

export async function getVotesPost() {
    const { token, selectedUser } = getTokenAndUser();
    return fetch(`https://apiprogrammingdev.onrender.com/user/adrian.contreras.martin/votes/posts`,
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
                //console.log(data)
                const mapa = data.reduce((acc, obj) => {
                  acc[obj.postId] = obj;
                  return acc;
                }, {});
                console.log(mapa)
                return mapa
              })
              .catch(error => {
                  console.error('Error al enviar la solicitud:', error);
                });
  }

  export async function getLikesPost() {
    const { token, selectedUser } = getTokenAndUser();
    return fetch(`https://apiprogrammingdev.onrender.com/user/adrian.contreras.martin/likes/posts`,
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
                //console.log(data)
                const mapa = data.reduce((acc, obj) => {
                  acc[obj.postId] = obj;
                  return acc;
                }, {});
                console.log(mapa)
                return mapa
              })
              .catch(error => {
                  console.error('Error al enviar la solicitud:', error);
                });
  }