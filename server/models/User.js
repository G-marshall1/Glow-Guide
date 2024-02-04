const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  primary: {
    type: Boolean,
    required: true,
    default: false,
  },
  alert: {
    type: Boolean,
    required: true,
    default: false, 
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
  locations: [citySchema]
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }
})

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema);

module.exports = User;
