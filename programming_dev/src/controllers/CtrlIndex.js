export async function getInfo(order, button, button2) {
    let apiUrl;

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
            'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f'
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
