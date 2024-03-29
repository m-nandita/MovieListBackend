const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));


// app.get('/', (req, res) => {
//     res.send('Hello')
// })

const db = require('./src/models');

app.use("/images", express.static(__dirname + '/src/service/uploads/'));

require('./src/routes/movie.route')(app);
require('./src/routes/auth.route')(app);

app.listen(8081, () => {
    console.log("Server is running on http://localhost:8081");
})