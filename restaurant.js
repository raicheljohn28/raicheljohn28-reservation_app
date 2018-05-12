var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservation = [
    {
        name: "Chris Hantis",
        phoneNumber: 9736150529,
        email: "mrchrishantis@gmail",
        id: 001
    },
];

var waitinglist = [
    {
        name: "Clark Kent",
        phoneNumber: 9738620445,
        email: "superman@gmail",
        id: 002
    },
];

//Routes
//Basic route to send user to AJAX page
app.get("/", function(req, res) {
    // res.send("Welcome to our Restaurant");
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    // res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.send("Reservation details listed");
    // res.sendFile(path.join(__dirname, "reserve.html"));
});

//Display the routes
app.get("/api/tables", function(req, res) {
    return res.json(reservation);
});

app.get("/api/waitinglist", function(req, res) {
    return res.json(waitinglist);
})

//Display the reservation or false
app.get("/api/tables/:reservation", function(req, res) {
    // Grab the selected parameter
    var chosen = req.params.reservation;
    console.log(chosen);
  
    // Filter to show only the selected character
    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
  
    // Otherwise display "No character found"
    return res.json(false);
  });

  //Display the waiting List or false
app.get("/api/waitinglist/:waitinglist", function(req, res) {
    // Grab the selected parameter
    var chosen = req.params.waitinglist;
    console.log(chosen);
  
    // Filter to show only the selected character
    for (var i = 0; i < waitinglist.length; i++) {
      if (chosen === waitinglist[i].routeName) {
        return res.json(waitinglist[i]);
      }
    }
  
    // Otherwise display "No character found"
    return res.json(false);
  });

  //Create a new Reservation
  app.post("/api/reservation", function(req, res) {
      var newEntry = req.body;

      newEntry.routeName = newEntry.name.replace(/\s+/g, "").toLowerCase();

      console.log(newEntry);
      reservation.push(newEntry);

      res.json(newEntry);   
  });

  //Listening to Server
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

  








