let result = document.getElementById('result');

async function printPlanets(){

    let planets_response = await fetch('https://swapi.dev/api/planets?format=json');
    console.log(planets_response);
    let planets = await planets_response.json();
    console.log(planets);

    planets.results.forEach(planet => {
        let li = document.createElement('li');

        li.innerHTML = `<button>${planet.name}</button>`

        result.appendChild(li);
    });
}