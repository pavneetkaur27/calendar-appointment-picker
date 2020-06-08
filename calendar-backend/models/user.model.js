const mongoose             = require('mongoose');
const Crypt                = require('../utils').Crypt;
const errors               = require('../helper').Errors;
const bv                   = require('bvalid');

const model_name = 'user';

const schema = mongoose.Schema({

    eml : { type : String,trim : true,lowercase : true,required : true,unique : true }, //e-mail
    nm  : {type : String,trim: true,default : "No Name" }, //user name
    act : { type : Boolean, default : true },
  },{ 
    timestamps : true
  }
);

schema.index({eml : 1, act : 1});

schema.statics = {
 
};

module.exports = mongoose.model(model_name,schema,model_name);