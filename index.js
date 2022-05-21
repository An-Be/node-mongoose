const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log(campsite);
        //find and log all the documents found as an object inside an array
        return Campsite.find();
    })
    .then(campsites => {
        console.log(campsites);
        //delete all docs created from campsite model and close connection
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    //if any errors happen, catch will log the error and then close the connection
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});
