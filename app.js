// Load packages
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/signup.html");

});

app.post('/', function(req, res){
  const url = "https://us1.api.mailchimp.com/3.0/lists/d994252a33";
  const api_key = "d7de8080d8a045227d69c778289b5c6f-us1";

  const data = {
  members: [{
    email_address: req.body.email,
    status: "subscribed",
    merge_fields: {
      FNAME: req.body.firstName,
      LNAME: req.body.lastName
    }
  }]
};

  const jsonData = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "key:d7de8080d8a045227d69c778289b5c6f-us1"
  };

  const request = https.request(url, options, function(response){
    //if (response.statusCode === 200){...}
    response.on("data", function(data){
      const responseData = JSON.parse(data);
      if (responseData.error_count == 0){
        res.sendFile(__dirname + "/success.html");
      } else
      {
        res.sendFile(__dirname + "/failure.html");
      }
      //console.log(JSON.parse(data));


    });
  });

  request.write(jsonData);
  request.end();


});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is up & running on port 3000");
});


// API Key: d7de8080d8a045227d69c778289b5c6f-us1
// List ID: d994252a33
