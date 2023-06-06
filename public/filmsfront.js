// Fetch Films Data
async function fetchFilmsData() {
    try {
      const response = await fetch('tsiprojectsql.mysql.database.azure.com/api/films');
      if (!response.ok) {
        throw new Error('Error fetching films data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
document.addEventListener('DOMContentLoaded', async () => {
  const filmsData = await fetchFilmsData();
  console.log(filmsData); // Handle the films data as needed

  displayFilms(filmsData);
});



// Display Films
function displayFilms(filmsData) {
  const filmListContainer = document.querySelector('.film-list');

  // Clear the existing film boxes
  filmListContainer.innerHTML = '';

  // Loop through the films data and generate the HTML for each film box
  filmsData.forEach(film => {
    const filmBox = createFilmBox(film);
    filmListContainer.appendChild(filmBox);
  });
}

// Create Film Box
function createFilmBox(film) {
  const filmBox = document.createElement('div');
  filmBox.classList.add('film-box');
  
  // Add the film details to the film box
  filmBox.innerHTML = `
    <h3 class="title">${film.title}</h3>
    <p class="more-info">Tap for more...</p>
  `;

  // Event listener for expanding the film box
  filmBox.addEventListener('click', () => {
    expandFilmBox(film);
  });

  return filmBox;
}

