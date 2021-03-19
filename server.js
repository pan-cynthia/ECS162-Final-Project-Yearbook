var express = require('express');
var app = express();

app.use(express.static('public'));

const bodyParser = require('body-parser');
const assets = require('./assets');
const sql = require('sqlite3').verbose();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

/*------------------- Login/Logout With Google -------------------*/
passport.use(new GoogleStrategy(
  {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://sparkly-languid-vermicelli.glitch.me/auth/accepted',  
  userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  scope: ['profile', 'email'] 
},
  gotProfile));

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use("/", printIncomingRequest);

app.use(expressSession(
  { 
    secret:'bananaBread',  // a random string used for encryption of cookies
    maxAge: 6 * 60 * 60 * 1000, // Cookie time out - six hours in milliseconds
    resave: true,
    saveUninitialized: false,
    name: "ecs162-session-cookie" // make a named session cookie; makes one called "connect.sid" as well
  }));

app.use(passport.initialize()); 

app.use(passport.session()); 

app.get('/*',express.static('public'));

app.use("/assets", assets);

app.get('/user/*', requireUser, requireLogin, express.static('.'));

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/accepted', 
  passport.authenticate('google', 
    { successRedirect: '/setcookie', failureRedirect: '/email=notUCD' }
  )
);

app.get('/setcookie', requireUser,
  function(req, res) {
      res.cookie('google-passport-example', new Date());
      res.redirect('/user/creatorview');
  }
);

app.get('/email=notUCD', 
  function(req, res){
    console.log('this was accessed');
    res.sendFile(__dirname + "/public/index.html");
  }
);

app.get('/user/logoff',
  function(req, res) {
    res.clearCookie('google-passport-example');
    res.clearCookie('ecs162-session-cookie');
    console.log("user logoff redirect");
    res.send("logged off");
  }
);

function printIncomingRequest (req, res, next) {
    console.log("Serving",req.url);
    if (req.cookies) {
      console.log("cookies",req.cookies)
    }
    next();
}

function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Google profile",profile);
    let dbRowID;
    console.log("profile id", profile.id);
    console.log("profile email", profile.emails[0].value);
    console.log(profile.emails[0].value.split("@")[1]);
    if (profile.emails[0].value.split("@")[1] != "ucdavis.edu") {
      console.log("email is not a ucdavis email");
      dbRowID = 0;
    }
    else {
      console.log("email is valid");
      dbRowID = profile.id; 
      let stuId = dbRowID;
  
      // insert student id into database only
      cmd = "INSERT INTO student_info ( id, firstname, lastname, fullname, major, college, gender, birthmonth, image, description) VALUES (?,?,?,?,?,?,?,?,?,?) ";
      stuDB.run(cmd, stuId, "", "", "", "", "", "", "", function(err) {
        if (err) {
          console.log("DB insert error",err.message);
        } else {
          console.log("inserted student");
        }
      });
    }
    done(null, dbRowID); 
};

passport.serializeUser((dbRowID, done) => {
    console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

passport.deserializeUser((dbRowID, done) => {
    console.log("deserializeUser. Input is:", dbRowID);
    let userData = {userData: dbRowID};
    done(null, userData);
});

function requireUser (req, res, next) {
  console.log("require user",req.user)
  if (!req.user) {
    res.redirect('/email=notUCD');
  } else {
    console.log("user is",req.user);
    next();
  }
};

function requireLogin (req, res, next) {
  console.log("checking:",req.cookies);
  if (!req.cookies['ecs162-session-cookie']) {
    res.redirect('/');
  } else {
    next();
  }
};
/*------------------- Creating the Database -------------------*/
// This creates an interface to the file if it already exists, and makes the file if it does not. 
const stuDB = new sql.Database("studentlist.db");

// Actual table creation; only runs if "studentlist.db" is not found
let cmd = " SELECT name FROM sqlite_master WHERE type='table' AND name='student_info' ";
stuDB.get(cmd, function (err, val) {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file - creating one");
        createStudentDB();
    } else {
        console.log("Database file found");
    }
});

function createStudentDB() {
  const cmd = 'CREATE TABLE student_info ( id TEXT PRIMARY KEY UNIQUE, firstname TEXT, lastname TEXT, fullname TEXT, major TEXT, college TEXT, gender TEXT, birthmonth TEXT, image TEXT, description TEXT)';
  stuDB.run(cmd, function(err, val) {
    if (err) {
      console.log("Database creation failure",err.message);
    } else {
      console.log("Created database");
    }
  });
}
/*------------------- Insert Student Profile Into Database -------------------*/
app.use(express.static("public"));
app.use(bodyParser.json()); 

app.post("/user/newItem", function(request, response) {
  console.log("Server received",request.body);
  console.log("profile id is", request.user.userData);
  let stuId = request.user.userData;
  let stuFirstName= request.body.firstname;
  let stuLastName = request.body.lastname;
  let stuFullName = request.body.firstname + " " + request.body.lastname;
  let stuMajor = request.body.major;
  let stuCollege = request.body.college;
  let stuGender = request.body.gender;
  let stuBirth = request.body.birthmonth;
  let img = request.body.image;
  let des = request.body.description;
  let data = [stuFirstName, stuLastName, stuFullName, stuMajor, stuCollege, stuGender, stuBirth, img, des, stuId];

  // put student profile data into database
  cmd = "UPDATE student_info SET firstname=?, lastname=?, fullname=?, major=?, college=?, gender=?, birthmonth=?, image=?, description=? WHERE id=?";
  stuDB.run(cmd, data, function(err) {
    if (err) {
      console.log("DB insert error",err.message);
    } else {
      console.log("inserted student");
      console.log(JSON.stringify(request.body));
      response.send(JSON.stringify(request.body));
    }
  });
});

app.get('/user/newItem', function (req, res) {
  console.log("get request received");
  let id = req.user.userData;
  let cmd = "SELECT * FROM student_info WHERE id = ?";
  stuDB.get(cmd, id, function (err, val) {
      if (err) {
        console.log("error retrieving info", err.message);
      } else {
        console.log("This is the data: " + JSON.stringify(val));
        res.json(val);
      }
  });
});

app.get('/userInfo*', function (req, res) {
  console.log("get request received");
  let url = req.originalUrl;
  if(url.charAt(url.length-1) == '&') url = url.substring(0, url.length-1);
  let id = url.substring(url.indexOf("?")+1);
  console.log("/userInfo id =", id);
  let cmd = "SELECT * FROM student_info WHERE id = ?";
  console.log("/userInfo cmd =", cmd);
  stuDB.get(cmd, id, function (err, val) {
      if (err) {
        console.log("error retrieving info", err.message);
      } else {
        console.log("This is the data: " + JSON.stringify(val));
        res.json(val);
      }
  });
});

app.get("/getsearchresults*", function handleStudentList(request, response, next) {
  let url = request.originalUrl;
  if(url.charAt(url.length-1) == '&') url = url.substring(0, url.length-1);
  let infoList = url.substring(url.indexOf("?")+1); // initial url is /studentList/list?*, get the substring starting from the character after '?'
  console.log(infoList);
  let cmd = "SELECT * FROM student_info"
  if(infoList.length > 0) {
    infoList = infoList.split("&");
    cmd += " WHERE";
    let andcount = 0;
    for(var i = 0; i < infoList.length; i++) {
      let key = infoList[i].split("=")[0];
      let val = infoList[i].split("=")[1];
      console.log("val =", val);
      if (val != undefined && (key == "college" || key == "birthmonth" || key == "firstname" || key == "lastname" || key == "fullname" || key == "major")) {
        val = val.replace(/%20/g,' ');
      }      
      if(key == "firstname" || key == "lastname" || key == "fullname" || key == "major" || key == "college" || key == "gender" || key == "birthmonth") {
        if(val == "College" || val == "Gender" || val == "Birth Month") {
          console.log("key = " + key + " val = " + val);
        } else {
          if(andcount > 0){
            cmd += "AND";
          }
          cmd += (" " + key + "='" + val + "' ");
          andcount = andcount+1;
        }
      }   
    }
    if (cmd == "SELECT * FROM student_info WHERE") {
      cmd = "SELECT * FROM student_info";
    }
  }
  console.log("cmd to execute: " + cmd);
  stuDB.all(cmd, function (err, rows) {
    if (err) {
      console.log("Database reading error", err.message)
      next();
    } else {
      // send shopping list to browser in HTTP response body as JSON
      response.json(rows);
      console.log("rows",rows);
    }
  });
});
/*------------------- Image Upload -------------------*/
const multer = require('multer');
const fs = require("fs");
const FormData = require("form-data");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/images')    
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

let uploadMulter = multer({storage: storage});
app.use("/images",express.static('images'));

let filename;

app.post('/upload', uploadMulter.single('newImage'), function (request, response) {
  console.log("Received",request.file.originalname,request.file.size,"bytes");
  filename = request.file.originalname;
  if(request.file) {
    response.end("Server received "+request.file.originalname);
  }
  else throw 'error';
})

app.get("/sendUploadToAPI", function(request, response){
        sendMediaStore(filename, request, response);
});

function sendMediaStore(filename, serverRequest, serverResponse) {
  let apiKey = process.env.ECS162KEY;
  if (apiKey === undefined) {
    serverResponse.status(400);
    serverResponse.send("No API key provided");
  } else {
    let form = new FormData();
    form.append("apiKey", apiKey);
    form.append("storeImage", fs.createReadStream("images/" + filename));
    form.submit("http://ecs162.org:3000/fileUploadToAPI", function(err, APIres) {
      if (APIres) {
        console.log("API response status", APIres.statusCode);
        let body = "";
        APIres.on("data", chunk => {
          body += chunk;
        });
        APIres.on("end", () => {
          if (APIres.statusCode != 200) {
            serverResponse.status(400); // bad request
            serverResponse.send(" Media server says: " + body);
          } else {
            serverResponse.status(200);
            serverResponse.send(body);
          }
          fs.unlinkSync("images/" + filename);
        });
      } else {
        serverResponse.status(500);
        serverResponse.send("Media server seems to be down.");
      }
    });
  }
}
/*------------------- Routes -------------------*/
// No route specified
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get("/user/creatorview", function(request, response) {
    response.sendFile(__dirname + "/public/index.html");
});

app.get('/readerview', function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.get('/user/finalview', function(request,response) {
  response.sendFile(__dirname + "/public/index.html");  
});

app.get('/display/*', function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.get('/searchresults/*', function (request, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.all("*", function (request, response) { 
  response.status(404);  // the code for "not found"
  response.send("This is not the droid you are looking for"); });

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});