var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1:1883')





function sendData() {
    const temperature=(Math.random() * (70 - 20) + 20).toFixed(2);
    const time=new Date().getTime()
    const msg={"timestamp": time,"temperature": parseFloat(temperature)}

    client.publish('/temperature', JSON.stringify(msg))
}
setInterval(sendData, 1500 );
