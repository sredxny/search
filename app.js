const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
//expose the public content
app.use(express.static(__dirname+'/public'));
//Set the view engine
app.set('view engine','hbs');

//add the helpers for the views
require('./hbs/helpers');

//add the routes file
app.use(require('./routes'));

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`Application listening in port ${port}`)
});