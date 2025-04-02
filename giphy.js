document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultsContainer = document.getElementById('resultsContainer');
  
    const apiKey = 'FFKTRwsRmqtVbLugYTvhxuUtV7Tqpi14';
  
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (!query) return;
  
      fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=12`)
        .then(response => response.json())
        .then(data => {
          resultsContainer.innerHTML = '';
          data.data.forEach(gif => {
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url;
            img.alt = gif.title;
            img.classList.add('gif');
            resultsContainer.appendChild(img);
          });
        })
        .catch(error => {
          console.error('Error fetching GIFs:', error);
          resultsContainer.innerHTML = '<p>Something went wrong.</p>';
        });
    });
  });
  