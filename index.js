const express = require('express');
const gtts = require('gtts.js').gTTS
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {

    const text = req.body.text;
    const speech = new gtts(text);

    speech
        .save('output.mp3')
        .then((data) => { res.download('output.mp3') })
        .catch((err) => console.error(err));

});

app.use(express.static(__dirname + '/styles'));
app.use(express.static(__dirname + '/images'));

app.listen(5000, function () {
    console.log('Server is listening on port 5000');
});

