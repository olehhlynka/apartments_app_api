const mongoose = require('mongoose')

const apartmentsSchema = new mongoose.Schema({
  rooms: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "number of rooms should be grater than 0",
    },
    required: true,
  },
  name: {
    type: String,
    maxLength: [98, "name shoud contain less than 99 characters"],
    required: true,
  },
  price: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: "price should be grater than 0",
    },
    required: true,
  },
  description: {
    type: String,
    maxLength: [998, "description should contain less than 99 characters"]
  },
});

module.exports = mongoose.model('Apartment', apartmentsSchema)