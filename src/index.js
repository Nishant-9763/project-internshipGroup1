const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://mnu4513:monu8181@firstcluster.daae6aq.mongodb.net/group1Database", {useNewUrlParser: true})
.then(() => console.log('mongoDB is connected'))
.catch(err => console.log(err));

const route = require('./routes/route');
app.use('/', route);

app.listen(3000, function() {
    console.log('app is running on 3000')
});