document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cardContainer');

  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar dados.json');
      }
      return response.json();
    })
    .then(items => {
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';

        card.innerHTML = `
          <img src="${item.imagem}" class="item-image">
          <div class="item-info"></div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar os dados:', error);
    });
});