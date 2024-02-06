const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');
const cityData = require('./cityData.json');


userData.forEach(user => {
  user.locations = []
  const amount = Math.floor(Math.random() * cityData.length)
  for (let i = 0; i < amount; i++) {
    const random = Math.floor(Math.random() * cityData.length)
    if (!user.locations.includes(cityData[random])){
      user.locations.push(cityData[random])
    }
  }
})

db.once('open', async () => {
  await cleanDB('User', 'users');

  await User.insertMany(userData);

  console.log('Users with city data seeded!');
  process.exit(0);
});
