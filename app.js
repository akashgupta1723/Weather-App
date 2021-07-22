const express= require('express');
const app=express();

const bodyParser=require("body-parser");

const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

   res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){
   const query=req.body.cityName;
   const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e39451bf7a686a71a48427f32facf3e4&units=metric";
   https.get(url,function(response){
     console.log(response.statusCode);

     response.on("data",function(data){
       const weatherData=JSON.parse(data);
       const temp=weatherData.main.temp
       const weatherDescription=weatherData.weather[0].description;
       const icon=weatherData.weather[0].icon;
       const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

       res.write("<p> The Weather is currently "+ weatherDescription +"</p>");
       res.write("<img src="+ imageUrl + ">");
       res.write("<h1>The Temprature in " + query+  " is "+ temp +" degree celcius</h1>");

       res.send();
     });
   });

});



app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
