'use strict';

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Parcel = require('../schema/parcel.js')

/* GET api listing. */
// router.get('/', function(req, res, next) {
//   res.end(JSON.stringify({ message: "Welcome to my template API" }));
// });

function permutationString(json, key) {
    var val = json[key];
    delete json[key];
    val = val.replace(/\S+/g, function(a) {
        return "\"" + a + "\"";
    });
    return val;
}

router.post('/search', function(req, res) {
	var searchRequest = req.body;
	console.log("Search Request -> ", searchRequest);
    if (Object.keys(searchRequest).length >= 1) {
        var query = Parcel.find(searchRequest);
        if ((searchRequest.OwnerName !== undefined) && (searchRequest.Address !== undefined)) {
            var OwnerName = permutationString(searchRequest, "OwnerName");
            var Address = permutationString(searchRequest, "Address");
            query = Parcel.find({ $and: [ { $text: { $search: OwnerName + " " + Address } }, searchRequest ] });
        }
        else if (searchRequest.OwnerName !== undefined) {
            var OwnerName = permutationString(searchRequest, "OwnerName");
            query = Parcel.find({ $and: [ { $text: { $search: OwnerName } }, searchRequest ] });
        }
        else if (searchRequest.Address !== undefined) {
            var Address = permutationString(searchRequest, "Address");
            query = Parcel.find({ $and: [ { $text: { $search: Address } }, searchRequest ] });
        }
        query.select("_id YearBuilt Address ZipCode OwnerName").exec(function(err, parcels) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Post to /api/search error:', err);
                res.status(500).send(JSON.stringify(err));
                return;
            }
            if (parcels === null || parcels === undefined) {
                // Query didn't return an error but didn't find any Parcels.
                res.status(404).end(JSON.stringify({ error: 'No such parcel' }));
                return;
            } else {
                // console.log(JSON.stringify(users));
                res.status(200).end(JSON.stringify(parcels));
                return;
            } 
        });
    }
});

router.get('/parcel/:id', function(req, res) {
    var parcelID = req.params.id;
    console.log("Parcel ID -> ", parcelID);
    if (parcelID !== undefined && parcelID !== null) {
        Parcel.findOne({ _id: parcelID }).exec(function(err, parcel) {
            if (err) {
                // Query returned an error.  We pass it back to the browser with an Internal Service
                // Error (500) error code.
                console.error('Get from /api/parcel/:id error:', err);
                res.status(500).send(JSON.stringify(err));
                return;
            }
            if (parcel === null || parcel === undefined) {
                // Query didn't return an error but didn't find any Parcels.
                res.status(404).end(JSON.stringify({ error: 'No such parcel' }));
                return;
            } else {
                // console.log(JSON.stringify(users));
                res.status(200).end(JSON.stringify(parcel));
                return;
            } 
        });
    }
});

module.exports = router;
