import { getTokenAndUser } from './CtrlUsers.js';

export async function getInfo(order, button, button2) {
    let apiUrl;
    const { token, selectedUser } = getTokenAndUser();
    if (button2 === 'Publicacions') {
        apiUrl = 'https://apiprogrammingdev.onrender.com/posts';
    } else if (button2 === 'Comentaris') {
        apiUrl = 'https://apiprogrammingdev.onrender.com/comments';
    }

    const url = `${apiUrl}?Tipus_Ordenacio=${order}&Filtre=${button}`;
    console.log('Fetching data from:', url);

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
