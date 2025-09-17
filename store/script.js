var result = ""

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    result = data
  })
.catch(error => console.error('Error:', error));