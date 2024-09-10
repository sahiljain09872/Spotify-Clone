const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema
const librarySchema = new Schema({
  imageSrc: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
  },
});

// Create the model
const Library = mongoose.model("Library", librarySchema);

// Export the model
module.exports = Library;
