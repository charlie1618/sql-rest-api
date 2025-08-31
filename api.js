var Db = require('./db_ops');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
});

router.route('/students').get((request, response) => {
    Db.getStudents().then((data) => {
        response.json(data);
    });
});

router.route('/students/:id').get((request, response) => {
    Db.getStudent(request.params.id).then((data) => {
        response.json(data);
    });
});

router.route('/students').post((request, response) => {
    let student = { ...request.body };
    Db.addStudent(student).then(data => {
        response.status(201).json(data);
    });
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log('Student API is running at ' + port);
