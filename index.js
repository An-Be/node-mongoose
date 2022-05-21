const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
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
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document'}
        }, {
            new: true
        });
    })
    .then(campsite => {
        console.log(campsite);

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view',
            author: 'Tinus Lovarldes'
        });

        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
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
