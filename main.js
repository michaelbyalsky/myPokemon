const input = document.querySelector("#search");
const button = document.querySelector("#searchButton");
const result = document.querySelector("#results");
let pokemonId;

button.addEventListener("click", (e) => {
  if (input.value) {
  if (e.target.id === "searchButton") {
    myPokemonId = Number(input.value);
    //searchPokemon(myPokemonId);
    searchPokemon(myPokemonId)
  }
}
})

const searchPokemon = async (pokemonId) => {
  const { data } = await axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  console.log(data);
  let pokRapper = document.createElement("div");
  pokRapper.classList.add("pokRapper");
  result.appendChild(pokRapper)
  pokRapper.innerHTML = 
  `<div>Pokemon Height: ${data.name}</div> 
  <div>Pokemon Name:  ${data.height}</div> 
  <div>Pokemon Height: ${data.weight}</div> 
  <div>Pokemon Image: <br> <img src="${data.sprites.front_default}"
  onmouseover="this.src='${data.sprites.front_default}';"
  onmouseout="this.src='${data.sprites.back_default}';"/></div>`;
};




