let express = require('express');
let app = express();
//for loading environment variables
require('dotenv').config();
//package for parsing POST requests
let bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());


//use style sheet
app.use("/public", express.static(__dirname + "/public"));

//component that requests and logs the method, path and ip
app.use(function middleware(req, res, next) {
    var string = req.method + " " + req.path + " - " + req.ip;
    next();
    return console.log(string);
  });

//http://localhost:5000/name?first=Omid&last=Noor
  app.get("/name", (req, res) => {
    var firstName = req.query.first;
    var lastName = req.query.last;
    
    res.json({
        name: `${firstName} ${lastName}`
    })
  })

  app.post("/name", (req, res) => {
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string})
  })

//chained middleware component
app.get("/now", (req, res, next) => {
    timeNow = new Date().toString();
    next();
}, function (req, res, next){
    res.send({
        time: timeNow
    });
})

//app.get("")

app.get("/:word/echo", (req, res) => {
    //require
    const { word } = req.params;
    // resond with the req.params object as a JSON Response
    res.json({
        echo: word
    })
  });

app.get("/", function (req, res) {
    //serve files
    res.sendFile(__dirname + '/views/index.html');
});

// app.get("/json", (req, res) => {
//     //serve json objects
//     res.json({
//         "message": "Hello json"
//     })
// });

app.get("/json", (req, res) => {
    // checks env var
if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
                "message": "HELLO JSON"
            })
  } else {
    res.json({
        "message": "Hello json"
    })
  }
});



module.exports = app;
