//jshint esversion:6

// create an express object from the express package
const express = require("express");
const bodyParser = require("body-parser");

// create an app object from the express object
const app = express();
//parse the hmtl file using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//load the html calculator page:
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/f2cCalc.html");
});

//From the form submission::
app.post("/f2cCalculator", function (req, res) {
  //get the value from the html form
  var fTemp = parseFloat(req.body.temp);

  //convert Fahrenheit to Celsius
  var f2c = ((fTemp - 32) * 5) / 9;

  //display the result in 2 decimal places
  res.send(
    fTemp + " degrees Fahrenheit converted to Centigrade is :" + f2c.toFixed(2)
  );
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
