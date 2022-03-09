/** @format */

require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()
const ngrok = require('ngrok');


const PORT = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(PORT, process.env.IP, () => {
	console.log(`App launched on ${PORT}`)
});

(async () => {
    const url = await ngrok.connect(app.get('PORT'));
    console.log(url);
})();


