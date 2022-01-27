const mongoose = require('mongoose');
var website = mongoose.model('website',{
    name : {type:String},
    status : {type :String}
});
module.exports = {website};