// Function to get the token from local storage
function getToken() {
    return localStorage.getItem('token');
  }
  
  // Function to make a fetch request
  function fetchData() {
    const token = getToken();
  
    fetch('http://localhost:4999/api/Values', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Here you can handle the data returned by your API
    })
    .catch(error => {
      console.log('There was a problem with the fetch operation: ' + error.message);
    });
  }

  export default fetchData;