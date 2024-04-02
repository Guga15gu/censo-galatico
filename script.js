let planet_buttons = document.getElementById('planet_buttons');
printPlanets();

async function searchPlanet(){
    let search_input = document.getElementById('search_input');
    let search_planet_name = search_input.value;

    let planet_response = await fetch(`https://swapi.dev/api/planets/?search=${encodeURIComponent(search_planet_name)}`);
    let planet = await planet_response.json();

    if (planet.count === 0) {
        let planet_details_div = document.getElementById('planet_details');
        planet_details_div.innerHTML = "<div>Planeta não encontrado</div>";
    } 
    else {
        let planet_data = planet.results[0];
        
        await getPlanetDetails(planet_data.name);

        let planet_found_div = document.createElement('div');
        planet_found_div.textContent = 'Planeta Encontrado';
        
        let planet_details_div = document.getElementById('planet_details');
        planet_details_div.prepend(planet_found_div);
    }

}

async function printPlanets(){

    let planets_response = await fetch('https://swapi.dev/api/planets?format=json');
    console.log(planets_response);
    let planets = await planets_response.json();
    console.log(planets);

    planets.results.forEach(planet => {
        let button = document.createElement('button');
        button.textContent = planet.name;
        button.addEventListener('click', () => {
            getPlanetDetails(planet.name);
          });

          planet_buttons.appendChild(button);
    });
}

async function getPlanetDetails(planetName) {

    let planet_response = await fetch(`https://swapi.dev/api/planets/?search=${encodeURIComponent(planetName)}`);
    let planet_data = await planet_response.json();
    let planet = planet_data.results[0];
    
    let new_planet_details_div = document.createElement('div');
    new_planet_details_div.id = 'planet_details';

    let h2_name = document.createElement('h2');
    h2_name.textContent = planet.name;
    new_planet_details_div.appendChild(h2_name);

    let div_climate = document.createElement('div');
    div_climate.textContent = `Clima: ${planet.climate}`;
    new_planet_details_div.appendChild(div_climate);

    let div_population = document.createElement('div');
    div_population.textContent = `População: ${planet.population}`;
    new_planet_details_div.appendChild(div_population);

    let div_terrain = document.createElement('div');
    div_terrain.textContent = `Terreno: ${planet.terrain}`;
    new_planet_details_div.appendChild(div_terrain);

    let planet_details = document.getElementById('planet_details');
    planet_details.replaceWith(new_planet_details_div);
}
  