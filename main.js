const input = document.querySelector("#search");
const button = document.querySelector("#searchButton");
const result = document.querySelector("#results");
let pokemonId;

button.addEventListener("click", (e) => {
  if (input.value) {
    if (e.target.id === "searchButton") {
      myPokemonId = input.value;
      searchPokemon(myPokemonId);
    }
  }
});

//Gives the option to add task by enter
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    myPokemonId = input.value;
    searchPokemon(myPokemonId);
  }
});

const searchPokemon = async (pokemonId) => {
    await axios
    .get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => { 
      makePok(response.data)
    })
    .catch(error => {
      console.log(error.message);
      document.getElementById("error").innerHTML = "<p>Pokemon not found</p>"
      setTimeout(() => {
        document.getElementById("error").innerHTML = '';
      }, 3000);
    });
  };
  
let allTypes;
const makePok = (data) => {
  let pokRapper = document.createElement("div");
  pokRapper.classList.add("pokRapper");
  result.appendChild(pokRapper);
  console.log(data.types)
  let types = data.types
  let pokType = "";
  types.forEach(i => {
    console.log(i);
    pokType += `<a id="pok" href="#">${i.type.name}  </a>`
  });
  pokRapper.innerHTML = `<div>Pokemon Height: ${data.name}</div> 
  <div>Pokemon Name:  ${data.height}</div> 
  <div>Pokemon Height: ${data.weight}</div>
  <div class="types">types: ${pokType}</div> 
  <div>Pokemon Image: <br> <img src="${data.sprites.front_default}"
  onmouseover="this.src='${data.sprites.back_default}';"
  onmouseout="this.src='${data.sprites.front_default}';"/></div>`;
  }
  
  document.addEventListener("click", (e) => {
    if (e.target.id === "pok") {
      let parent = e.target.parentElement
      openList(e.target.innerText, parent)
  }
  if (e.target.id === "brotherName") {
    searchPokemon(e.target.innerText);
}
  })

  const openList = async (pokemonName, node) => {
    console.log(pokemonName);
      await axios
      .get(`http://pokeapi.co/api/v2/type/${pokemonName}`)
      .then(response => {
        console.log(response) 
        showBrothers(response.data, node)
      })
      .catch(error => {
        console.log(error.message);
        document.getElementById("error").innerHTML = "<p>Type not found</p>"
        setTimeout(() => {
          document.getElementById("error").innerHTML = '';
      }, 3000);
      });
  }
    


const showBrothers = (data, node) => {
  console.log(data.pokemon)
  let brothersRapper = document.createElement("div");
  brothersRapper.classList.add("brothersRapper");
  node.appendChild(brothersRapper);
  let names = data.pokemon
  let pokNames = "";
  names.forEach(i => {
    console.log(i)
    pokNames += `<a id="brotherName" href="#">${i.pokemon.name}  </a>`
  });
  brothersRapper.innerHTML = `<div id="brothersList">Pokemon Brothers: ${pokNames}</div> `
};
