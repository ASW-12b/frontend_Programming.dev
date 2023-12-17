export function getInfo(what_search, textBoxValue) {
    let apiUrl;
    if (what_search === 'Publicacions') {
        apiUrl = `https://apiprogrammingdev.onrender.com/posts_search?titol=${textBoxValue}`;
    } else if (what_search === 'Comentaris') {
        apiUrl = `https://apiprogrammingdev.onrender.com/comments_search?comentari=${textBoxValue}`;
    }
    console.log('Fetching data from:', apiUrl);

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Data fetched:', data);
            if (data.missatge) {
                return { isError: true, message: data.missatge };
            }
            return { isError: false, data: data };
        })
        .catch(error => {
            console.error('Error fetching info:', error);
            return { isError: true, message: 'An error occurred while fetching data.' };
        });
}