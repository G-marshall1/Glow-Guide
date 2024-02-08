const db = require('../config/connection');
const { User, City } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const cityData = require('./cityData.json');



db.once('open', async () => {
  await cleanDB('User', 'users');
  await cleanDB('City', 'cities')
  const cities = await City.create(cityData)

  userData.forEach(user => {
    user.locations = []
    for (let city of cities) {
      if (Math.random() > .4){        
        user.locations.push( city._id.toString() )
      }
    }
  })
    
  await User.create(userData);

  console.log('Users with city data seeded!');
  process.exit(0);
});
