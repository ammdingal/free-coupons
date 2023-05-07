let express = require('express');
let app = express();
let session = require('express-session');
let bodyParser = require('body-parser');

let count = 10;
let post_data_available = false;

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'cutie',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    req.session.count = count;
    res.render('index', {count: req.session.count, post_data_available: post_data_available});
});

app.post('/redeem', function(req, res){
    if (req.body.name) {
        post_data_available = true;
        res.redirect('/');
    } else {
        res.redirect('/');
    }
});

app.post('/claim', function(req, res){
    count--;
    let couponNumber = Math.floor(Math.random() * 10000000);
    post_data_available = true;
    res.render('index', {count: count, post_data_available: post_data_available, couponNumber: couponNumber});
})


app.post('/reset', function(req, res){
    count = 10;
    post_data_available = false;
    res.redirect('/');
})

app.listen(8000, function(req, res){
    console.log('listening on port 8000')
})
