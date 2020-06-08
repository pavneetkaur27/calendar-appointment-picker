const mongoose   = require('mongoose');
const model_name = 'appointment';

const skillSchema = mongoose.Schema({
        date    : { type : Number,required:true},         // ex 2,3
        month   : { type : Number,required:true},         // ex 2(Feb)
        time    : { type : Number,required:true},        // ex (3)
        time_meridian :  { type : Number,required:true},  // 1 for AM, 2 for PM 
        status  : { type : Number,required:true},      // 1 for open, 2 for booked , 3 for blocked 
        user_id : {type :  mongoose.Schema.Types.ObjectId, required : true},
        act     : { type : Boolean,default:true}
    },{
        timestamps : true
  }
);



skillSchema.statics = {
    TIME_MERIDIAN : {
      AM : 1,
      PM : 2
    },
    STATUS : {
        OPEN        : 1,
        BOOKED      : 2,
        BLOCKED     : 3,
    }
};

module.exports = mongoose.model(model_name,skillSchema,model_name);