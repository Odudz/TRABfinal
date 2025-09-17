// Get data stored in JSON file
var result = ""

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    result = data
    load()
  })
.catch(error => console.error('Error:', error));

// Function to create card element and add to cardContainer
const cardContainer = document.getElementById('cardContainer')

function createCard(data){

  // Create card element
  const card = document.createElement('div')
  card.setAttribute('class','item-card')

  // Create img of card element
  const cardImg = document.createElement('img')
  cardImg.setAttribute('src',data.img)

  // Create name of card element
  const cardName = document.createElement('p')
  cardName.textContent = data.name


  // Append img and name to card div
  card.appendChild(cardImg)
  card.appendChild(cardName)

  // Append card div to card container
  cardContainer.appendChild(card)
}

function load(){
  for(var i = 0; i < result.length; i++){
    createCard(result[i])
  }
}