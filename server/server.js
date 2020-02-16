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
const insertOfferById = async (id, name, donor_id, price, timestamp, qty, img, description) => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});
  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO offers (id, name, donor_id, price, timestamp, qty, img, description) value (${id}, '${name}', ${donor_id}, ${price}, '${timestamp}', ${qty}, '${img}', '${description}')`, (err, res) => {
      console.log('insert offer res: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}
const insertDonorById = async (id, name, latitude, longitude, description) => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise((resolve, reject) => {
    conn.query(`INSERT INTO donors (id, name, latitude, longitude, description) value (${id}, '${name}', ${latitude}, ${longitude}, '${description}')`, (err, res) => {
      console.log('insert offer res: ', res); 
      console.log('err: ', err); 
      conn.end();
      resolve(res)
    })
  })
}

const resetTables = async () => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});
  try {
    await conn.query(`DELETE FROM donors`)
    await insertDonorById(1,'Brendas French Soul Food',37.787211,-122.397065,'Fresh takes on beignets, po boys & other Big Easy bites draw crowds to this narrow but airy spot.')
    await insertDonorById(2,'Burma Club',37.789517,-122.396711,'From the Burma Superstar group comes this elegant, bi-level eatery for Burmese favorites & drinks.')
    await insertDonorById(3,'Jersey Pizza',37.788696,-122.393202,'Buzzy, brick-lined Italian spot serving clever East Coast-style pies, plus craft draft beer & wine.')

    await conn.query(`DELETE FROM offers`)
    await insertOfferById(1,'Pepperoni Pizza',3,123,'NOW()',12,'food1.jpg','We have some day old pizza that we need to get rid of')
    await insertOfferById(2,'Chicken Curry',2,300,'NOW()',20,'food2.jpg','Theres too much chicken curry')
    await insertOfferById(3,'Cornbread',1,100,'NOW()',6,'food3.jpg','Delicious cornbread for cheap')
    await insertOfferById(4,'Old Pastries',1,232,'NOW()',4,'food4.jpg','Day old pastries for sale')
    await insertOfferById(5,'Chicken Tenders',1,200,'NOW()',14,'food5.jpg','Chicken tenders kept warm that we dont want to throw away')
    await insertOfferById(6,'Day Old Calzones',3,100,'NOW()',11,'food6.jpg','Plenty of day old calzones for cheap')
  } catch (err) {
    return err
  }
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
const getAllDonors = async () => {
  const conn = mariadb.createConnection({host: 'localhost', user:'tomtom', password: 'password', database: 'yente'});

  return new Promise ((resolve, reject) => {
    conn.query(`SELECT * FROM donors;`, (err, res) => {
      console.log('donors: ', res); 
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

/*****************************
 * ALL ROUTES ***************
*****************************/

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
  return res.send(JSON.stringify(res2))
})
app.get('/api/donors', async (req, res) => {
  const res2 = await getAllDonors()
  console.log(`donors:`, res2)
  return res.send(JSON.stringify(res2))
})
app.get('/api/donors/:id', async (req, res) => {
  const res2 = await getDonorById(req.params.id)
  console.log(`donor ${req.params.id}:`, res2)
  return res.send(JSON.stringify(res2))
})
app.get('/api/reset', async (req, res) => {
  const res2 = await resetTables()
  console.log(`tables reset:`, res2)
  return res.send(JSON.stringify(res2))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))