var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')


var tempcount=0
var humcount=0


function sendDataTemperature() {
    const temperature=(Math.random() * (84 - 80) + 80).toFixed(2);
    const temperatureError=(Math.random() * (80 - 75) + 75).toFixed(2);
    const time=new Date().getTime()
    const msg={"timestamp": time,"temperature": parseFloat(temperature)}
    if (tempcount<15){
        client.publish('/temperature', JSON.stringify(msg))
        tempcount+=1
    }
    else {
        const msgError={"timestamp": time,"temperature": parseFloat(temperatureError)}
        client.publish('/temperature', JSON.stringify(msgError))
    }


}



function sendDataHumidity() {
    const humidity=(Math.random() * (52 - 49) + 49).toFixed(2);
    const humidityError=(Math.random() * (45 - 40) + 40).toFixed(2);
    const time=new Date().getTime()
    const msg={"timestamp": time, "humidity":parseFloat(humidity)}
    const msgError={"timestamp": time, "humidity":parseFloat(humidityError)}
    if (humcount<15){
        client.publish('/humidity', JSON.stringify(msg))
        humcount+=1
    } else {
        client.publish('/humidity', JSON.stringify(msgError))
    }


}


setInterval(sendDataTemperature, 3000 );
setInterval(sendDataHumidity, 3000 );


