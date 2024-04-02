let result = document.getElementById('result');

async function printPlanets(){

    let res = await fetch('https://swapi.dev/api/planets/?format=json');

    let {results} = await res.json();

    console.log(results);
}