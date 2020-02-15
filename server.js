const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

app.get('/api', (req, res) => res.send(JSON.stringify({message: 'hello from express'})))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))