const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(cors())
const mariadb = require('mariadb/callback');
// conn.query("SELECT * FROM offers", (err, rows) => {
//     console.log(rows); //[ {val: 1}, meta: ... ]
//     // conn.query("INSERT INTO offers value (?, ?, ?, ?, ?)", [1, "qty"], (err, res) => {
//     conn.query(`INSERT INTO offers (qty, description, price, donor_id, timestamp) value (12, 'foo', 15, 1, '2020-02-15T00:00:00.000Z')`, (err, res) => {
//       console.log('res: ', res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//       console.log('err: ', err); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//       conn.end();
//     });
// });
const insertOffer = async (qty, description, price, donor_id, timestamp) => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});
  // return await conn.query(`INSERT INTO offers (qty, description, price, donor_id, timestamp) value (${qty}, '${description}', ${price}, ${donor_id}, '${timestamp}')`, (err, res) => {
  //   console.log('res: ', res); 
  //   console.log('err: ', err); 
  //   conn.end();
  // });
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

  // let result
  // return await conn.query(`SELECT * FROM offers JOIN donors ON (donor_id=donors.id) WHERE donor_id=${donorId};`, (err, res) => {
  //   console.log('res: ', res); 
  //   console.log('err: ', err); 
  //   result = res
  //   conn.end();
  //   // return result
  // })
  return new Promise ((resolve, reject) => {
    conn.query(`SELECT * FROM offers JOIN donors ON (donor_id=donors.id) WHERE donor_id=${donorId};`, (err, res) => {
      console.log('res offers from donor: ', res); 
      console.log('err: ', err); 
      result = res
      conn.end();
      // return result
      resolve(res)
    })
  })
  // console.log('hello')
  // return result
}
const getAllOffers = async () => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise ((resolve, reject) => {
    conn.query(`SELECT * FROM offers JOIN donors ON (donor_id=donors.id);`, (err, res) => {
      console.log('res all offers: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}

app.get('/api', async (req, res) => {
  // const dbRes = await asyncFunction()
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))