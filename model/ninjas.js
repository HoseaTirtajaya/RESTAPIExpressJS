const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// {
//   "type": "Feature",
//   "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   }
//CREATE GEOLOCATION SCHEMA
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

//CREATE NINJA SCHEMA
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Field is Required"],
  },
  rank: {
    type: String,
  },
  avail: {
    type: Boolean,
    default: false,
  },
  //ADD IN GEOLOCATION
  geometry: GeoSchema,
});

const Ninja = mongoose.model("ninja", NinjaSchema);

module.exports = Ninja;
