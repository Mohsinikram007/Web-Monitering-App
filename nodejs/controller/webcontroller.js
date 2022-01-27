const bodyParser = require('body-parser');
const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var https = require('https')
let lengthOfArray;


let webcheck;
let globalStatus;

var { website } = require('../Models/web');

// => localhost:3004/website/
router.get('/', (req, res) => {
    website.find((err, docs) => {
        if (!err) {
            var arr = []
            lengthOfArray = docs.length
            //db.collection('webistes').find().sort({'_id':-1}).limit(1)
            //console.log(lengthOfArray);
            //res.send(docs)

            //console.log(arr.name);
            arr.push(docs[lengthOfArray - 1])
            webcheck = arr[0].name;
            console.log(webcheck);
            //https.get("https://www.google.com/", function (ress) {
            https.get(`https://${webcheck}`, function (ress) {
                //console.log("statusCode: ", res.statusCode); // <======= Here's the status code
                // console.log("headers: ", res.headers);
                //console.log(res.s);

                if (ress.statusCode === 200) {
                
                    console.log(ress.statusCode);
                    console.log(arr[0].name);
                    console.log("hello");

                    globalStatus = "UP"
                    res.send(docs)
                }
                




            }).on('error', function (e) {
                globalStatus = "Downsss"
                res.send(docs)
            });


            //res.send(getLastData())
            // setTimeout(() => {res.send(docs)}, 2000);




        }
        //else { console.log('Error in Retriving Website :' + JSON.stringify(err, undefined, 2)); }
    });
});




router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    website.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Website:' + JSON.stringify(err, undefined, 2)); }
    });
});




router.post('/', (req, res) => {
    //var x ="down"
    var web = new website({
        name: req.body.name,
        //status : req.body.status
        status: globalStatus


    });
    globalStatus = ""
    web.save((err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log("error in savingd data", JOSN.stringify(err, undefined, 2));
        }
    })
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var web = {
        name: req.body.name,
        status: req.body.status

    };
    website.findByIdAndUpdate(req.params.id, { $set: web }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in webiste name Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    website.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in website Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});




module.exports = router;