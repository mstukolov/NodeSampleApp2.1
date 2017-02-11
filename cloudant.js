/**
 * Created by Maxim on 02.02.2017.
 */
// Load the Cloudant library.
require('dotenv').load();
var Cloudant = require('cloudant');

var user = '3001d0cb-d7a0-4bc7-9b9d-af8547c9534e-bluemix'; // Set this to your own account
var password = "e1c74b3c6cc9d597387c58ef9868da4d4ffd47800fa490c317427fdc3aba48f5";

// Initialize the library with my account.
var cloudant = Cloudant({account:user, password:password});

cloudant.db.list(function(err, allDbs) {
    console.log('All my databases: %s', allDbs.join(', '))
});

// Remove any existing database called "alice".
cloudant.db.destroy('alice', function(err) {

    // Create a new "alice" database.
    cloudant.db.create('alice', function() {

        // Specify the database we are going to use (alice)...
        var alice = cloudant.db.use('alice')

        // ...and insert a document in it.
        alice.insert({ crazy: true }, 'rabbit', function(err, body, header) {
            if (err) {
                return console.log('[alice.insert] ', err.message);
            }

            console.log('You have inserted the rabbit.');
            console.log(body);
        });
    });
});

var db = cloudant.db.use('rawsmartcooler')
db.index(function(er, result) {
    if (er) {
        throw er;
    }

    console.log('The database has %d indexes', result.indexes.length);
    for (var i = 0; i < result.indexes.length; i++) {
        console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
    }

    //result.should.have.a.property('indexes').which.is.an.Array;
    //done();
});

db.find({selector:{'date':{'$gt': '2017-02-01T11:15:54.946Z'}}}, function(er, result) {
    if (er) {
        throw er;
    }

    console.log('Found %d documents with name Alice', result.docs.length);
    for (var i = 0; i < result.docs.length; i++) {
        console.log('  Doc id: %s, %s', result.docs[i]._id, result.docs[i].currentWeight);
    }
});