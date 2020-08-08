const input = document.querySelector("#search");
const button = document.querySelector("#searchButton");
const result = document.querySelector("#results");
let pokemonId;

//add event listener to the search button
button.addEventListener("click", (e) => {
  if (input.value) {
    myPokemonId = input.value;
    input.value = "";
    searchPokemon(myPokemonId);
  }
});

//Gives the option to add task by enter
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    myPokemonId = input.value;
    input.value = "";
    searchPokemon(myPokemonId);
  }
});

//get data of certain pokemon
const searchPokemon = async (pokemonId) => {
  await axios
    .get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => {
      makePok(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      document.getElementById("error").innerHTML = "<p>Pokemon not found</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
    });
};

//make new pokemon based on the data
const makePok = (data) => {
  let pokRapper = document.createElement("div");
  pokRapper.classList.add("pokRapper");
  result.appendChild(pokRapper);
  console.log(data.types);
  let types = data.types;
  let pokType = "";
  types.forEach((i) => {
    pokType += `<a id="pok" href="#">${i.type.name}  </a>`;
  });
  pokRapper.innerHTML = `<div>Pokemon Height: ${data.name}</div> 
  <div>Pokemon Name:  ${data.height}</div> 
  <div>Pokemon Height: ${data.weight}</div>
  <div class="types">types: ${pokType}</div> 
  <div id="imgWrapper">Pokemon Image: <br> <img id="pokImg" src="${data.sprites.front_default}"
  onmouseover="this.src='${data.sprites.back_default}';"
  onmouseout="this.src='${data.sprites.front_default}';"/></div>
  <button id="delBtn">Delete Pokemon</button>`;
};

document.addEventListener("click", (e) => {
  //add event listener to the all types
  if (e.target.id === "pok") {
    let parent = e.target.parentElement;
    openList(e.target.innerText, parent);
  }
  //add event listener to the pokemons the shares the same type
  if (e.target.id === "brotherName") {
    searchPokemon(e.target.innerText);
    e.target.parentElement.parentElement.innerHTML = "";
  }
  console.log(e.target.id);
  if (e.target.id === "delBtn") {

    let parent = document.getElementById("delBtn").parentElement
    parent.parentElement.removeChild(parent) 
  }
});

//get the all pokemon names that shares the same data the user clicked
const openList = async (pokemonName, node) => {

  await fetch(`http://pokeapi.co/api/v2/type/${pokemonName}`)
    .then((res) => res.json())
    .then((data) => showBrothers(data, node))
    .catch((error) => {
      console.log(error.message);
      document.getElementById("error").innerHTML = "<p>Type not found</p>";
      setTimeout(() => {
        document.getElementById("error").innerHTML = "";
      }, 3000);
    });
};

//show all the pokemons that have the same data
const showBrothers = (data, node) => {
  let brothersRapper = document.createElement("div");
  brothersRapper.classList.add("brothersRapper");
  node.appendChild(brothersRapper);
  let names = data.pokemon;
  let pokNames = "";
  names.forEach((i) => {
    pokNames += `<a id="brotherName" href="#">${i.pokemon.name}</a>&nbsp;&nbsp;`;
  });
  brothersRapper.innerHTML = `<div id="brothersList">
  <p>Pokemon Brothers: </p>
  <div class="container" id="broNameCon">${pokNames}</div>
  <button id="closeBtn">close</button>
  </div> `;
  document.addEventListener("click" , (e) => {
   if (e.target.id === "closeBtn") {
    brothersRapper.innerHTML = "";
  } 
  })
};
