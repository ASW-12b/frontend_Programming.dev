import {getTokenAndUser} from "./CtrlUsers.js";

export function getCommunities(filtre) {

    const { token, selectedUser } = getTokenAndUser();
    let url = `https://apiprogrammingdev.onrender.com/communities?Filtre=${filtre}`;
    console.log('Fetching data from:', url);
    console.log('3324', token);
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched:', data);
            if (data.message) {
                return { isError: true, message: data.message };
            }
            return { isError: false, data: data };
        })
        .catch(error => {
            console.error('Error fetching info:', error);
            return { isError: true, message: 'An error occurred while fetching data.' };
        });

}