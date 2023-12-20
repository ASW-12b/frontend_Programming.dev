export function getCommunities(filtre) {

    let url = `https://apiprogrammingdev.onrender.com/communities?Filtre=${filtre}`;
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