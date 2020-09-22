var nodemailer = require('nodemailer');
var busLocationData=require('./BusLocationData');
var autModel=require('./AuthenticationModel')
var EventEmitter = require('events')
var ee = new EventEmitter()

var allUserData;



ee.on('message', function (text) {
  console.log(text)
  allUserData = new autModel.AuthenticaltionModel().readAllUserData();
  monitorBus();

})

//1 min interval
setInterval(()=>{
     ee.emit('message', 'hello world')
},60000);



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  /*this function will be called in server side and will be used to continuously check 
if bus has arrived the varsity */
//returns false if bus is outside the circle/varsity area 
checkUniversityRadius=function(bus_lat,bus_lon)
{
      // 23.7638646,90.4046308
      var varsity_lat=23.7638646;
      var varsity_lon=90.4046308;
      radius=1;   //in km

      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(bus_lat - varsity_lat); // deg2rad below
      var dLon = deg2rad(bus_lon - varsity_lon);
      
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(varsity_lat)) * Math.cos(deg2rad(bus_lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
     
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in km
      
       
        return d<radius;
      

}
function deg2rad(deg) {
   return deg * (Math.PI / 180)
 }

 //used to send notification via email using node mailer package
 function sendEmailNotification(to,flag,busName)
 {
           
        var text='';
        if(flag==1)
        {
            text= busName+' has already reached the University';
        }
        else
        {
            text=busName+' is going outside the university';
        }
       var mailOptions = {
         from: 'sajidahmed696@gmail.com',
         to: to,
         subject: 'Bus Koi',
         text: text
       };
       
       print(mailOptions)
       transporter.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
       });
 }
 



monitorBus=()=>
{
    var allBusData =  busLocationData.fetchAllBusLocationInfo();
    
    var Mp= new Map(Object.entries(allBusData));
   
    for (let [busName, busData] of Mp) 
    {
        console.log(busName + ' ==== ' +JSON.stringify(busData,null,4) +"\n");
        
            
        //if bus is in the area
        if(checkUniversityRadius(busData['coordinate'].latitude,busData['coordinate'].longitude) )
        {
            for(user in allUserData)
            {
                 
                if( busName.includes(user['subscribedBus']))
                {
                    sendEmailNotification(user['email'],1,busName);
                }
            
            }
        }
        else
        {
            for(user in allUserData)
            {
                 
                if( busName.includes(user['subscribedBus']))
                {
                    sendEmailNotification(user['email'],2,busName);
                }
            
            }
        }
    
    
    }

}