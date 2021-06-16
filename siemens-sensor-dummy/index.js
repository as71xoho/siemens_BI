var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')





function sendDataTemperature() {
    const temperature=(Math.random() * (85 - 82) + 82).toFixed(2);
    const time=new Date().getTime()
    const msg={"timestamp": time,"temperature": parseFloat(temperature)}
    client.publish('/temperature', JSON.stringify(msg))



}


function sendDataHumidity() {
    const humditiy=(Math.random() * (40 - 35) + 35).toFixed(2);
    const time=new Date().getTime()
  
    const msg={"timestamp": time, "humditiy":humditiy}
    client.publish('/timestop', JSON.stringify(msg))
    
 



}
setInterval(sendDataTemperature, 1500 );
setInterval(sendDataHumidity, 1500 );

