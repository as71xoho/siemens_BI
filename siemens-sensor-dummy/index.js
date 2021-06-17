var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')


var temp=78
var hum=30


function sendDataTemperature() {
    const temperature=temp+1
    temp+=2
    const time=new Date().getTime()
    const msg={"timestamp": time,"temperature": parseFloat(temperature)}
    client.publish('/temperature', JSON.stringify(msg))

}

function sendDataTemperatureError() {
    const temperature=(Math.random() * (95 - 75) + 75).toFixed(2);
    const time=new Date().getTime()
    const msg={"timestamp": time,"temperature": parseFloat(temperature)}
    client.publish('/temperature', JSON.stringify(msg))

}

function sendDataHumidity() {
    const humidity=(Math.random() * (40 - 35) + 35).toFixed(2);
    const time=new Date().getTime()
  
    const msg={"timestamp": time, "humidity":parseFloat(humidity)}
    client.publish('/humidity', JSON.stringify(msg))
    console.log(msg)
    
}

function sendDataHumidityError() {
    const humidity=(Math.random() * (52 - 43) + 43).toFixed(2);
    const time=new Date().getTime()

    const msg={"timestamp": time, "humidity":parseFloat(humidity)}
    client.publish('/humidity', JSON.stringify(msg))
    console.log(msg)
    
}
setInterval(sendDataTemperature, 1500 );
setInterval(sendDataHumidity, 1500 );
setInterval(sendDataTemperatureError, 5000 );
setInterval(sendDataHumidityError, 5000 );

