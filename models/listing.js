const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review= require("./review.js");


const listingSchema = new Schema({
    title:{
         type: String,
         //required : true,
    },
    description: String,
   image: {
  type: String,
  default: "https://unsplash.com/photos/high-rise-buildings-city-scape-photography-wpU4veNGnHg",

  set: (v) => {
    // agar empty ho
    if (v === "" || v == null) {
      return "https://unsplash.com/photos/high-rise-buildings-city-scape-photography-wpU4veNGnHg";
    }

    // agar object aaye (data.js wala case)
    if (typeof v === "object" && v.url) {
      return v.url;
    }

    // normal string case
    return v;
  }
},

    price: Number,
    location:String,
    country: String, 
    reviews : [
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
   owner: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
},

});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id:{$in: listing.reviews}});
}});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;  