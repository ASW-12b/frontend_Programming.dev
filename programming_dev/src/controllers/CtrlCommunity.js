import { getTokenAndUser } from './CtrlUsers.js';
export function createCommunity(id, name, avatar, banner) {

  const apiUrl = 'https://apiprogrammingdev.onrender.com/communities';
  const { token, selectedUser } = getTokenAndUser();
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
      'Authorization': token,
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


export function updateSubscrits(community) {
    const communityId = community[0].pk;
    const { token, selectedUser } = getTokenAndUser();
    let apiUrl = `https://apiprogrammingdev.onrender.com/communities/${communityId}/subscribe`;
    console.log('Fetching data from:', apiUrl);

    return fetch(apiUrl, {
        method: 'PUT',  // Change the method to 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',  // Include 'accept' header
            'Authorization': token,  // Include 'Authorization' header
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


export function deleteSubscrits(community) {
    const communityId = community[0].pk;
    const { token, selectedUser } = getTokenAndUser();
    let apiUrl = `https://apiprogrammingdev.onrender.com/communities/${communityId}/unsubscribe`;
    console.log('Fetching data from:', apiUrl);

    return fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',  // Include 'accept' header
            'Authorization': token,  // Include 'Authorization' header
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
