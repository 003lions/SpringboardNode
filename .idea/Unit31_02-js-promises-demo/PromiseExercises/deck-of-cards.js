
const baseURL = 'https://deckofcardsapi.com/api/deck';

// 1 Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
  // Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
  // A Brand New Deck
  // https://deckofcardsapi.com/api/deck/new/

$.get(`${baseURL}/new/draw`)
  .then( data => {
    console.log(data);
    const card = data.cards[0]
    // console.log(card);
    console.log(`${ card.value } of ${ card.suit }`);
  });

// 2 Make a request to the deck of cards API to request a single card from a newly shuffled deck.
  // Once you have the card, make a request to the same API to get one more card from the same deck.
  // Once you have both cards, console.log the values and suits of both cards.
let cardsDrawn = [];
let deck_id = '';

$.get(`${baseURL}/new/draw`)
  .then( data => {
    cardsDrawn.push(`${ data.cards[0].value } of ${ data.cards[0].suit }`)
    return $.get(`${baseURL}/${data.deck_id}/draw`);
  })
  .then( data => {
    cardsDrawn.push(`${ data.cards[0].value } of ${ data.cards[0].suit }`)
    cardsDrawn.forEach((card) => { console.log(`${ card}`) })
  });

// 3 Build an HTML page that lets you draw cards from a deck.
// When the page loads, go to the Deck of Cards API to create a new deck,
// and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card, until there are no cards left in the deck.
// let deck_id = null;
let $btn = $('button');

$.get(`${baseURL}/new/shuffle/`)
  .then(data => {
    deck_id = data.deck_id;
    $('button').show();
  });

$('button').on('click', function() {
  $.get(`${baseURL}/${deck_id}/draw/`)
    .then(data => {
      // console.log(data)
      $('#show-card').replaceWith($(`
        <div id="show-card">
            <img src="${data.cards[0].image}" alt="${ data.cards[0].value } of ${ data.cards[0].suit }">
            <p>Remaining Cards: ${data.remaining}</p>
        </div>` ));
      if (data.remaining === 0) $('button').remove();
    });
  });

