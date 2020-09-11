const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eMail = req.body.eMail;

const data ={
  members: [
    {
      email_address: eMail,
      status: "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const json = JSON.stringify(data);

const url = "https://us17.api.mailchimp.com/3.0/lists/03506e6acd";

const options = {
  method: "POST",
  auth: "abhishek:13d4a49e6ae91ebed0cb0dc2f5b86b19-us17"
}

const request = https.request(url, options, function(response){

  if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});

request.write(json);
request.end();
});


app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("This server is running on port 3000");

});

// 13d4a49e6ae91ebed0cb0dc2f5b86b19-us17

// 03506e6acd
