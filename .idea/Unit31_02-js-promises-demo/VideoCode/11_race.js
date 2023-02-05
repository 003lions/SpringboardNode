

let fourPokemonRace = [];

for (let i = 1; i < 5; i++) {
  fourPokemonRace.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}


// Promise.race
// resolves when the first promise is resolved.
// rejects as soon as the first reject is recieved
Promise.race(fourPokemonRace)
  .then(res => {
    console.log(`${res.data.name} won the race!`)
  })
  .catch(err => console.log(err))
