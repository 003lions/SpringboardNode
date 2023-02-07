
///Movies//////////////////////////////////////////////////////
async function getStarWarsData() {
  console.log("starting!");
  const movieData = await axios.get("https://swapi.dev/api/films/");
  console.log("all done!");
  console.log(movieData);
}

// getStarWarsData();

async function tryGetStarWarsData() {
  try {
    const movieData = await axios.get("https://swapi.dev/api/filmsss/");
    console.log(movieData)
  }
  catch (e) {
    console.log("I caught you")
  }
}

// tryGetStarWarsData();

///Git User//////////////////////////////////////////////////////
function promiseGetUser(user) {
    axios.get(`https://api.github.com/users/${user}`)
      .then(response => {
        console.log(`${response.data.name}: ${response.data.bio}`)
      })
      .catch(e => {
        console.log(`The username ${user} doesn't exist on github.`, e)
      })
}
// promiseGetUser('mmmaaatttttt');

async function asyncGetUser(user) {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`)
    console.log(`${response.data.name}: ${response.data.bio}`)
  } catch (e) {
    console.log(`The username ${user} doesn't exist on github.`, e)
  }
}
// asyncGetUser('mmmaaatttttt')

///Changing colour//////////////////////////////////////////////////////
//
// const h1 = document.querySelector('h1');
// function changeColor(el, color) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       el.style.color = color;
//       resolve()
//     }, 1000)
//   })
// }
//
// // changeColor(h1, 'red')
// //   .then(() => changeColor(h1, 'orange'))
// //   .then(() => changeColor(h1, 'yellow'))
// //   .then(() => changeColor(h1, 'green'))
// //   .then(() => changeColor(h1, 'blue'))
// //   .then(() => changeColor(h1, 'indigo'))
// //   .then(() => changeColor(h1, 'violet'))
//
async  function rainbow(el) {
  await changeColor(h1, 'red')
  await changeColor(h1, 'orange')
  await changeColor(h1, 'yellow')
  await changeColor(h1, 'green')
  await changeColor(h1, 'blue')
  await changeColor(h1, 'indigo')
  await changeColor(h1, 'violet')
}
// rainbow(h1)

///Cards//////////////////////////////////////////////////////
// https://deckofcardsapi.com
const deck = {
  async init() {
    let res = await axios.get('http://deckofcardsapi.com/api/deck/new')
    // console.log(res)
    this.deckId = res.data.deck_id;
    console.log(res.data)
  },
  async shuffle() {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`)
    console.log(res.data)
  },
  async drawCard() {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=2`)
    console.log(res.data)
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    console.log(`${res.data.cards[1].value} of ${res.data.cards[1].suit}`)
  }
}
async function card() {
  await deck.init()
  await deck.shuffle()
  await deck.drawCard()
  await deck.drawCard()
}
// card()

///Pokemon//////////////////////////////////////////////////////
class Pokemon {
  constructor(id) {
    this.id = id;
    this.name = null;
    this.types = [];
  }
  async getInfo() {
    let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
    this.name = res.data.name
    for (let type of res.data.types) {
      this.types.push(type.type.name)
    }
  }
}
// const pokemon = new Pokemon(45)
// pokemon.getInfo()
// console.log(pokemon)

function promiseGetThreePokemon() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon'
  axios.get(`${baseURL}/1`)
    .then(({ data }) => {
      console.log(`The first pokemon is ${data.name}`)
      return axios.get(`${baseURL}/2`)
    })
    .then(({ data }) => {
      console.log(`The second pokemon is ${data.name}`)
      return axios.get(`${baseURL}/3`)
    })
    .then(({ data }) => {
      console.log(`The third pokemon is ${data.name}`)
    })
    .catch(e => {
        console.log(`Problem.`, e)
    })
}
// promiseGetThreePokemon()

async function asyncGetThreePokemon() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon'
  try {
    let {data: p1} = await axios.get(`${baseURL}/1`)
    console.log(`The first pokemon is ${p1.name}`)
    let {data: p2} = await axios.get(`${baseURL}/2`)
    console.log(`The second pokemon is ${p2.name}`)
    let {data: p3} = await axios.get(`${baseURL}/3`)
    console.log(`The third pokemon is ${p3.name}`)
  } catch (e) {
    console.log('Problem', e)
  }
}
// asyncGetThreePokemon()

async function asyncParallelGetThreePokemon() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon'
  try {
    // all requests sent at the same time
    const p1Promise = axios.get(`${baseURL}/1`)
    const p2Promise = axios.get(`${baseURL}/2`)
    const p3Promise = axios.get(`${baseURL}/3`)
    // await for the all responses
    const one = await p1Promise
    const two = await p2Promise
    const three = await p3Promise
    // display results
    console.log(`The first pokemon is ${one.name}`)
    console.log(`The second pokemon is ${two.name}`)
    console.log(`The third pokemon is ${three.name}`)
  } catch (e) {
    console.log('Problem', e)
  }
}
// asyncParallelGetThreePokemon()

async function asyncParallelPromiseAllGetThreePokemon() {
  const baseURL = 'https://pokeapi.co/api/v2/pokemon'
  try {
    // all requests sent at the same time and await for all to finish
    const pokemon = await Promise.all([
      axios.get(`${baseURL}/1`),
      axios.get(`${baseURL}/2`),
      axios.get(`${baseURL}/3`)
    ])
    // display results
    console.log(`The first pokemon is ${pokemon[0].data.name}`)
    console.log(`The second pokemon is ${pokemon[1].data.name}`)
    console.log(`The third pokemon is ${pokemon[2].data.name}`)
  } catch (e) {
    console.log('Problem', e)
  }
}
asyncParallelPromiseAllGetThreePokemon()
