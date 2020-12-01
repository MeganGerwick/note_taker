const express = require("express");
const htmlroutes = require('./routes/htmlRoutes');
const apiroutes = require('./routes/apiRoutes');


//add api routes 

const app = express();

//first value assigns port when on Heroku when in production or 8000 if the first value does not exist 
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use(apiroutes);
app.use(htmlroutes);



app.listen(PORT, () => {
    console.log('App listening on PORT' + PORT);
});


