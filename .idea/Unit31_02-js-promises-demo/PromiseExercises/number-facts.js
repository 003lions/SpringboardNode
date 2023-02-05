// Part 1: Number Facts

const baseURL = "http://numbersapi.com";
const favoriteNumber = 7;

// 1 Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
//
//    Make sure you get back JSON by including the json query key, specific to this API. Details (http://numbersapi.com/#json}.
//    So use ?json for example http://numbersapi.com/random/year?json

$.getJSON(`${baseURL}/${favoriteNumber}?json`)
  .then(data => {
  console.log(data);
});


// 2 Figure out how to get data on multiple numbers in a single request.
//    Make that request and when you get the data back, put all of the number facts on the page.
//    http://numbersapi.com/7,8,9,10?json

const favoriteNumbers = [7, 42, 9, 1];
Promise.all(
  Array.from(favoriteNumbers, (number) => {
    return $.get(`${baseURL}/${number}?json`);
    })
  )
  .then(facts => {
    facts.forEach(fact => $("body").append(`<div>${fact.text}</div><br>`));
});

// 3 Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
// It’s okay if some of the facts are repeats.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.get(`${baseURL}/${favoriteNumber}?json`);
    })
  )
  .then(facts => {
    facts.forEach(fact => $("body").append(`<div>${fact.text}</div><br>`));
});

