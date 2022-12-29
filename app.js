// using native HTTPS module to perform HTTPS requests for
// calling API

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
    



}); 

app.post("/", function(req, res){


const query = req.body.cityName;
const apikey = "886705b4c1182eb1c69f28eb8c520e20";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=metric";
const unit = "metric";
    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){

            const weatherData = JSON.parse(data)
            // will convert any data into javascript objects
            
            // JSON.stringify(object); - will chane javascript objects to strings

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query +  " is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageUrl + ">");
            // our image icon is 50n so i change 10d to 50n in the img src 
            res.send();

        });

    });
});


app.listen(3000, function(){
    console.log("Server listening on port 3000");
});





