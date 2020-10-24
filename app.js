const express = require("express");
const bp = require("body-parser");
const request = require("request");
const https = require("https");
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "9f4868596e9ecb77e1c8c6498e646874-us2",
  server: "us2",
});


const app = express();

app.use(bp.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.post("/",(req,res)=>{
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const listid = "10effd4790";

  async function run() {
    try {
      const response = await client.lists.addListMember(listid,{
          email_address: email,
          status: "subscribed",
          merge_fields :{
            FNAME: firstName,
            LNAME: lastName
          }
      });
      console.log(response);
      res.sendFile(__dirname + "/sucess.html");
    }
    catch(e){
        res.sendFile(__dirname + "/failure.html");
        console.log(e);
    }
  }

  run();

});

app.listen(process.env.PORT || 3000 ,() =>{
  console.log("Server Started at Port 3000");
});


// API Id : 9f4868596e9ecb77e1c8c6498e646874-us2

// List Id : 10effd4790
