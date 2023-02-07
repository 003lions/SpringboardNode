// Part 1: Number Facts

const baseURL = "http://numbersapi.com";

// 1 Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number.
//
//    Make sure you get back JSON by including the json query key, specific to this API. Details (http://numbersapi.com/#json}.
//    So use ?json for example http://numbersapi.com/random/year?json

const numberFacts = {
  async numberSearch(param) {
    const res = await axios.get(`${baseURL}/${param}?json`)
    console.log(res.data.text)
  },
  async multiNumberSearch(param) {
    const res = await axios.get(`${baseURL}/${param}?json`)
    // console.log(res);
    for (const fact in res.data) {
      // console.log(`${res.data[fact]}`);
      $("#part2").append(`<div>${res.data[fact]}</div><br>`)
    }
  },
  async multiFactSearch(param) {
    const res = await axios.get(`${baseURL}/${param}?json`)
    for (const fact in res.data) {
      // console.log(`${res.data[fact]}`);
      $("#part3").append(`<div>${res.data[fact]}</div><br>`)
    }
  }
}

async function favoriteNumber(favoriteNumber) {
  numberFacts.numberSearch(favoriteNumber)
}

favoriteNumber(7)

// 2 Figure out how to get data on multiple numbers in a single request.
//    Make that request and when you get the data back, put all of the number facts on the page.
//    http://numbersapi.com/7,8,9,10?json

async function multipleNumbers(favoriteNumbers) {
  let param = favoriteNumbers.toString()
  numberFacts.multiNumberSearch(param)
}

multipleNumbers([7,42,9,1])

// 3 Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
// It’s okay if some of the facts are repeats.

async function multiFact(favoriteNumber) {
  numberFacts.multiFactSearch(favoriteNumber)
}
multiFact(7)

