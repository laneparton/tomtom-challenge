const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(cors())
const mariadb = require('mariadb/callback');

const insertOffer = async (qty, description, price, donor_id, timestamp) => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO offers (qty, description, price, donor_id, timestamp) value (${qty}, '${description}', ${price}, ${donor_id}, '${timestamp}')`, (err, res) => {
      console.log('insert offer res: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}

const getOffersFromDonor = async (donorId) => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise ((resolve, reject) => {
    conn.query(`SELECT * FROM offers WHERE donor_id=${donorId};`, (err, res) => {
      console.log('res offers from donor: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}
const getDonorById = async (donorId) => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise ((resolve, reject) => {
    conn.query(`SELECT * FROM donors WHERE id=${donorId};`, (err, res) => {
      console.log('donor: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}

const getAllOffers = async () => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise ((resolve, reject) => {
    conn.query(`SELECT * FROM offers;`, (err, res) => {
      console.log('res all offers: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}

app.get('/api', async (req, res) => {
  return res.send(JSON.stringify({message: 'hello world from express'}))
})
app.post('/api/offers', jsonParser, async (req, res) => {
  const {
    qty, 
    description,
    price, 
    donor_id, 
    timestamp
  } = req.body
  const res2 = await insertOffer(qty, 
    description,
    price, 
    donor_id, 
    timestamp
  )
  console.log(res2)
  return res.send(JSON.stringify({qty, description, price, donor_id, timestamp}))
})
app.get('/api/offers', async (req, res) => {
  const res2 = await getAllOffers()
  console.log(`all offers:`, res2)
  return res.send(JSON.stringify(res2))
})
app.get('/api/offers/:id', async (req, res) => {
  const res2 = await getOffersFromDonor(req.params.id)
  console.log(`offers from ${req.params.id}:`, res2)
  // return res.send(JSON.stringify(res2))
  return res.send(JSON.stringify(res2))
})
app.get('/api/donors/:id', async (req, res) => {
  const res2 = await getDonorById(req.params.id)
  console.log(`donor ${req.params.id}:`, res2)
  // return res.send(JSON.stringify(res2))
  return res.send(JSON.stringify(res2))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))