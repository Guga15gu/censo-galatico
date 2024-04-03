let planet_buttons = document.getElementById('planet_buttons');
printPlanets();

async function createTableResidents(residents_url_array){

    let residents_table = document.createElement('table');
    let residents_table_thead = document.createElement('thead');
    let residents_table_thead_tr = document.createElement('tr');
    
    let name_th = document.createElement('th');
    name_th.textContent = 'Nome';
    residents_table_thead_tr.appendChild(name_th);

    let birth_year_th = document.createElement('th');
    birth_year_th.textContent = 'Ano de Nascimento';
    residents_table_thead_tr.appendChild(birth_year_th);

    residents_table_thead.appendChild(residents_table_thead_tr);
    residents_table.appendChild(residents_table_thead);

    let residents_table_tbody = document.createElement('tbody');
    residents_url_array.forEach ( async resident_url => {

        let resident_response = await fetch(resident_url);
        console.log(resident_response);
        let resident = await resident_response.json();
        console.log(resident);

        let residents_table_tr = document.createElement('tr');

        let resident_name_td = document.createElement('td');
        resident_name_td.textContent = resident.name;
        residents_table_tr.appendChild(resident_name_td);

        let resident_birth_year_td = document.createElement('td');
        resident_birth_year_td.textContent = resident.birth_year;
        residents_table_tr.appendChild(resident_birth_year_td);

        residents_table_tbody.appendChild(residents_table_tr);
    });

    residents_table.appendChild(residents_table_tbody);

    return residents_table;
}

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

async function getPlanetDetails(planetName){

    let planet_response = await fetch(`https://swapi.dev/api/planets/?search=${encodeURIComponent(planetName)}`);
    let planet_data = await planet_response.json();
    let planet = planet_data.results[0];
    console.log(planet)
    
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

    let h3_residents = document.createElement('h3');
    h3_residents.textContent = 'Habitantes Famosos';
    new_planet_details_div.appendChild(h3_residents);
    
    if(planet.residents.length > 0){
        let residents_ul = await createTableResidents(planet.residents);
        new_planet_details_div.appendChild(residents_ul);
    }
    else{
        let not_residents_div = document.createElement('div');
        not_residents_div.textContent = 'Não há habitantes famosos';
        new_planet_details_div.appendChild(not_residents_div);
    }

    let planet_details = document.getElementById('planet_details');
    planet_details.replaceWith(new_planet_details_div);
}
  