export function createCommunity(id, name, avatar, banner) {

  const apiUrl = 'https://apiprogrammingdev.onrender.com/communities';

  // Create a FormData object to send the multipart/form-data request
  const formData = new FormData();
  formData.append('id', id);
  formData.append('name', name);
  formData.append('avatar', avatar); // Assuming avatar is a File object
  formData.append('banner', banner); // Assuming banner is a File object

  const csrfToken = '8xK1Ftn5Lg03MKv2MdWEAXpUe52j5idnDCQ7EcI2KVhDnezGqrACs0eNILzrSa0g';

  // Perform the API call using fetch
  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Authorization': '3ed9e367-519d-4435-8b35-c15d829e528f',
      'X-CSRFToken': csrfToken,
    },
    body: formData,
  })
        .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response:', data);
      return data; // You can modify this based on your requirements
    })
    .catch(error => {
      console.error('API request failed:', error);
      throw error; // You can handle the error as needed
    });
}