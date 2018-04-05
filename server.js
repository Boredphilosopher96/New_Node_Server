const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' ,  'hbs');
app.use(express.static(__dirname +'/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + ' ' + req.method+ ' '+ req.url;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n' , (err) => {
        if(err){
            console.log('Unable to log file');
            
        }
    });
    next();
});

// app.use((req, res , next) =>{
//     res.render('down.hbs');
// });

hbs.registerHelper('getCurrentYear' , () => new Date().getFullYear());

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
})

app.get('/', (req , res) => {
    //res.send("<h1>Hello express</h1>");
    res.render('home.hbs', {
        pageTitle : 'Home',
        WelcomeMessage : 'WELCOME MY FRIENDsssssssssss'
    });
});

app.get('/about' , (req, res) =>{
    res.render('about.hbs' , {
        pageTitle : 'About page '
    });
});

app.get('/bad', (req, res) =>{
    res.send({
        errorMessage : 'Unable to receive request'
    });
});

app.listen(5000, () => {
    console.log('Server is up on port 5000');
});