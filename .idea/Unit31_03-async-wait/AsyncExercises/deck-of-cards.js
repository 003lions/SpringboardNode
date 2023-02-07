
const baseURL = 'https://deckofcardsapi.com/api/deck';

// 1 Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
  // Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
  // A Brand New Deck
  // https://deckofcardsapi.com/api/deck/new/

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
  async drawCard(num) {
    let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${num}`)
    console.log(res.data)
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  },
  async buttonClick(num) {
      let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`)
      $('#show-card').replaceWith($(`
        <div id="show-card">
            <img src="${res.data.cards[0].image}" alt="${res.data.cards[0].value} of ${res.data.cards[0].suit}">
            <p>Remaining Cards: ${res.data.remaining}</p>
        </div>`));
      if (res.data.remaining === 0) $('button').remove();
  }
}
async function card1(num) {
  await deck.init()
  await deck.shuffle()
  await deck.drawCard(num)
}
// card1(1)

// 2 Make a request to the deck of cards API to request a single card from a newly shuffled deck.
  // Once you have the card, make a request to the same API to get one more card from the same deck.
  // Once you have both cards, console.log the values and suits of both cards.
async function card2(num) {
  await deck.init()
  await deck.shuffle()
  await deck.drawCard(num)
  await deck.drawCard(num)
}
// card2(1)


// 3 Build an HTML page that lets you draw cards from a deck.
// When the page loads, go to the Deck of Cards API to create a new deck,
// and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card, until there are no cards left in the deck.

async function card3(num) {
  await deck.init()
  await deck.shuffle()
}
card3(2)

