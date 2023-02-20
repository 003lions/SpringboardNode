const express = require('express');

const app = express();
app.use(express.json());  // pass the request body as json data, if it is json data
app.use(express.urlencoded({ extended: true }));  // pass the request body as form data, if it is form data

app.get('/dogs', function(req, res) {
  return res.send('Dogs go woof woof');
});

// this will never get matched
app.get('/dogs', function(req, res) {
  return res.send('but what about these dogs???');
});

//params////////////////////////////////////////
const greetings = {
  en: 'hello',
  fr: 'bonjour',
  ic: 'hallo',
  js: 'konnichiwa'
}

app.get("/greet/:language", (req, res) => {
  // console.log(req.params)
  const lang = req.params.language
  const greeting = greetings[lang]

  if (!greeting) return res.send("Invalid Language")

  return res.send(greeting)
})
// http://localhost:3000/greet/fr

//search//////////////////////////////////////////////////
app.get('/search', (req, res) => {
  const { term = 'piggies', sort = 'top' } = req.query;
  return res.send(`Search page - term: ${term}, sort: ${sort}`)
})
// http://localhost:3000/search
// http://localhost:3000/search/macas/raising

//headers//////////////////////////////////////////////////
app.get('/show-headers', (req, res) => {
  console.log(req.rawHeaders);
  console.log(req.headers);
  return res.send(req.headers)
})
app.get('/show-headers-language', (req, res) => {
  const lang = req.headers['accept-language']
  return res.send(`Your language preference is: ${lang}`)
})

//body//////////////////////////////////////////////////
app.get('/register', (req, res) => {
  return res.send(`Welcome, ${req.body.username}`)
})
app.get('/show-body', (req, res) => {
  const lang = req.headers['accept-language']
  return res.send(`Your language preference is: ${lang}`)
})

app.listen(3000, function () {
  console.log('App on port 3000');
})
