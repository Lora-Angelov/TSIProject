// Fetch Actors Data
async function fetchActorsData() {
    try {
      const response = await fetch('https://tsiprojectback.azurewebsites.net/api/actors');
      if (!response.ok) {
        throw new Error('Error fetching actors data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', async () => {
    const actorsData = await fetchActorsData();
    console.log(actorsData); // Handle the actors data as needed
  
    displayActors(actorsData);
  });
  
  // Display Actors
  function displayActors(actorsData) {
    const actorListContainer = document.querySelector('.actor-list');
  
    // Clear the existing actor boxes
    actorListContainer.innerHTML = '';
  
    // Loop through the actors data and generate the HTML for each actor box
    actorsData.forEach(actor => {
      const actorBox = createActorBox(actor);
      actorListContainer.appendChild(actorBox);
    });
  }
  
  // Create Actor Box
  function createActorBox(actor) {
    const actorBox = document.createElement('div');
    actorBox.classList.add('actor-box');
  
    // Add the actor details to the actor box
    actorBox.innerHTML = `
      <h3 class="first-name">${actor.first_name}</h3>
      <h3 class="last-name">${actor.last_name}</h3>
      <p class="more-info">Tap for more...</p>
    `;
  
    // Event listener for expanding the actor box
    actorBox.addEventListener('click', () => {
      expandActorBox(actor);
    });
  
    return actorBox;
  }