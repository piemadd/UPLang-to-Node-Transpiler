const express = require('express')
const app = express()

clientsConnected = []

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.get('/connect/:id', (req, res) => {
	clientsConnected.push()
})

app.listen(80, () => {
	console.log(`Server up on port ${port}`)
})