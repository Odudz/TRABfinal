async function getAPOD() {
    const apiKey = 'dq5zFht8BlQRSFJ1qr4Fc3Bjix6jX7jfiAw7SvDT' // API key
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
            
    try {
        const response = await fetch(url);
        const data = await response.json();

            // Set image & explanation
        document.getElementById('image').src = data.url;
        document.getElementById('explanation').textContent = data.explanation;

        } catch (error) {
                console.error('Erro ao acessar a API:', error);
    }
}