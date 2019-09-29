const functions = require('firebase-functions');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'user_info'
})
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
})

// Get all users
app.get('/userList', (request, response) => {
    // Cached
    // response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    var get_user_sql = "SELECT * from user_info";
    connection.query(get_user_sql, function(err, result, fields){
        if(err) throw err;
        response.send(result);
    })
});

app.post('/login', function(request, response) {
    console.log(request.body.name);
    var data = request.body;
    var login_sql = 'INSERT INTO user_info (name) VALUES ('+data.name+')';
    connection.query(login_sql, function(err, request){
        if(err) throw err;
        response.send('Success');
    })
});



exports.app = functions.https.onRequest(app);
