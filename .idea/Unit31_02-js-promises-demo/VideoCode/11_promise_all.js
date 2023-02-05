let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
  fourPokemonPromises.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}


// create 404 error
// fourPokemonPromises.push(axios.get('kjedbfekrjn'))

// Promise.all
// resolves when all four promises are resolved
// rejects if any of the promises are rejected
Promise.all(fourPokemonPromises)
  .then(pokemonArr => {
    for (res of pokemonArr) {
      console.log(res.data.name)
    }
  })
  .catch(err => console.log(err));

