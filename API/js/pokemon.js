function updatePokemonData(data){
    document.querySelector("img").src = data.sprites.front_default;
    document.getElementById("name").innerText = data.species.name;
    document.getElementById("type").innerText = data.types[0].type.name;
    document.getElementById("hp").innerText = data.stats[0].base_stat;
    document.getElementById("attack").innerText = data.stats[1].base_stat;
}

function getNewPokemonData(){
    //get value from the input box
    const url = `https://pokeapi.co/api/v2/pokemon/${this.value}`;
    // console.log(url);
    fetch(url).then(function(response){
        return response.json();
        // console.log(data);
    }).then(function(data){
        console.log(data);
        updatePokemonData(data);
    }).catch(function(error){
        console.log(error);
    });

}

document.getElementById("pokemon").addEventListener("change", getNewPokemonData);