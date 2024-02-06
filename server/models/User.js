const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const preferencesSchema = new Schema({
  email: {
    type: Boolean
  },
  text: {
    type: Boolean
  },
  phonecall: {
    type: Boolean
  },
  strengthMinimum: {
    type: Number,
    max_length: 9,
    min_length: 1
  },
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  
  locations: [{ type: Schema.Types.ObjectId, ref: 'City'}],
  alertPreferences: [preferencesSchema],  
});

userSchema.virtual('cityCount').get(function () {
  return this.locations.length
})

userSchema.virtual('cityAlerts').get(function () {
  cities = []
  this.locations.forEach(city => cities.push(city.name))
  return cities
})

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
  next()
})

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema);

module.exports = User;
