const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    country:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        trim:true
    },
    rank:{
        type:Number,
        unique:true
    },
    money:{
        type:Number
    },
    dailyDiff:{
        type:Number
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// playerSchema.virtual('durationWeeks').get(function() {
//   return this.duration / 7;
// });


// playerSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// playerSchema.pre(/^find/, function(next) {
//   this.find({ secretTour: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

// playerSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
