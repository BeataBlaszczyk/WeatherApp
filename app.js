const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express()
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.static("public"));
app.get("/", function(req, res) {

  res.render("home", {
    cityName: "",
    description: "",
    source: "",//"/images/img.png",
    temp:""
  });
});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "04d4f262e172bdf21eafa0f2693dd48b";
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?units=" + units + "&q=" + query + "&appid=" + apiKey

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

      console.log(temp + "temp");
      res.render("home", {
        cityName: query,
        description: "The weather is currently " + weatherDescription,
        source: icon,
        temp: temp + " °C"
      });


    });
  });


});


app.listen(3000, function() {
console.log("Server is running on port 3000")
})
