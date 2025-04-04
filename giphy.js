document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const randomBtn = document.getElementById('randomBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const clearBtn = document.getElementById('clearBtn');
    
    const apiKey = 'FFKTRwsRmqtVbLugYTvhxuUtV7Tqpi14';
  
    function displayGifs(gifs) {
      resultsContainer.innerHTML = '';
      gifs.forEach(gif => {
        const img = document.createElement('img');
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.classList.add('gif');
        resultsContainer.appendChild(img);
      });
    }
  
    function searchGifs() {
      const query = searchInput.value.trim();
      if (!query) return;
  
      fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=12`)
        .then(response => response.json())
        .then(data => displayGifs(data.data))
        .catch(error => {
            console.error('Error fetching GIFs:', error);
            const errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Something went wrong 😔';
          
            resultsContainer.innerHTML = '';
            resultsContainer.appendChild(errorMessage);
          
            setTimeout(() => {
              errorMessage.remove();
            }, 3000); // Fade out after 3 seconds
          });
        } 
  
    function loadTrendingGifs() {
      fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`)
        .then(response => response.json())
        .then(data => displayGifs(data.data))
        .catch(error => {
          console.error('Error loading trending GIFs:', error);
        });
    }
  
    function loadRandomGif() {
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            const gif = data.data;
            displayGifs([gif]); // ✅ Pass a single gif as an array
          })
          .catch(error => {
            console.error('Error loading random GIF:', error);
          });
      }
      
    searchBtn.addEventListener('click', searchGifs);
    randomBtn.addEventListener('click', loadRandomGif);
  
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        searchGifs();
      }
    });

    clearBtn.addEventListener('click', () => {
        resultsContainer.innerHTML = '';
      });
      
    loadTrendingGifs(); // 🔥 Load trending on startup
  });
  
  