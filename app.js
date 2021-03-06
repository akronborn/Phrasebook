const express = require('express');
const bodyparser = require('body-parser');
const gTTS = require('gtts');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
});

app.post('/', (req, res) => {

  let text = req.body.text;
  let filename = req.body.filename;
  let lang = req.body.lang;
  let gtts = new gTTS(text, lang);

  gtts.save(`${filename}.mp3`, function (err, result) {
    if (err) { throw new Error(err) }
    console.log('Audio file created.');

  });
})

app.listen(`${port}`, () =>
  console.log(`Server is listening ${port}`)
);