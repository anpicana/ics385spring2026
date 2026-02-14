//create an express object from the express package
const express = require("express");
const bodyParser = require("body-parser");

//create an app object from the express object
const app = express();
//parse the hmtl file using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//load the html calculator page from the directory:
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/VolCalculator.html");
});

//From the form submission when user clicks button:
app.post("/VolCalc", function (req, res) {
  //convert the value from the html form to: float
  var radius = parseFloat(req.body.radius);
  var height = parseFloat(req.body.height);

  //compute cylinder volume
  var vol = Math.PI * Math.pow(radius, 2) * height;

  //display the result in 2 decimal places
  res.send(
    "The Cylinder Volume, given r=" +
      radius +
      " and h=" +
      height +
      " is: " +
      vol.toFixed(2)
  );
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
