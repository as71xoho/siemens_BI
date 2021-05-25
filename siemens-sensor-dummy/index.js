var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')





function sendDataTemperature() {
    const temperature=(Math.random() * (70 - 20) + 20).toFixed(2);
    const time=new Date().getTime()
    const msg={"timestamp": time,"temperature": parseFloat(temperature)}
    client.publish('/temperature', JSON.stringify(msg))



}

let lastTimeStamp=new Date().getTime()
function sendDataTime() {
    const nextmsg=(Math.random() * (5000 - 3000) + 5000);
    const time=new Date().getTime()
    const timepassed=(time-lastTimeStamp)/1000
    const msg={"timestamp": time, "timePassed":timepassed.toFixed(2)}
    client.publish('/timestop', JSON.stringify(msg))
    lastTimeStamp=time
    setTimeout(sendDataTime,nextmsg)



}
setInterval(sendDataTemperature, 1500 );
sendDataTime()
