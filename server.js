const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

app.use(cors())
const mariadb = require('mariadb/callback');
const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});
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
  return await conn.query(`INSERT INTO offers (qty, description, price, donor_id, timestamp) value (${qty}, '${description}', ${price}, ${donor_id}, '${timestamp}')`, (err, res) => {
    console.log('res: ', res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    console.log('err: ', err); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    conn.end();
  });
}
app.get('/api', async (req, res) => {
  // const dbRes = await asyncFunction()
  return res.send(JSON.stringify({message: 'hello world from express'}))
})
app.post('/api/offer', jsonParser, async (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))