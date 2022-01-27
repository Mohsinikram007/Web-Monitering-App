const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/moniter_app',(err)=>{
    if(!err)
    {
        console.log('MongoDB connected...');
    }
    else{
        console.log("error in db "+ JSON.stringify(err,undefined,2));
    }
});
module.export = mongoose;