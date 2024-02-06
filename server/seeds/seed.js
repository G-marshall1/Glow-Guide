const db = require('../config/connection');
const { User, City } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const cityData = require('./cityData.json');



db.once('open', async () => {
  await cleanDB('User', 'users');
  const cities = await City.insertMany(cityData)

  userData.forEach(user => {
    user.locations = []
    for (city in cities) {
      if (Math.random() > .4){
        user.locations.push(city._id)
      }
    }
  })
  
  await User.insertMany(userData);

  console.log('Users with city data seeded!');
  process.exit(0);
});
