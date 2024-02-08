const { Schema, model } = require('mongoose');

const citySchema = new Schema({
    name: {
      type: String,
      required: true
    }, 
    longitude: {
      type: String
    },
    latitude: {
      type: String
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
    ZIP: {
      type: String
    }
  })

  const City = model('City', citySchema)

  module.exports = City


  