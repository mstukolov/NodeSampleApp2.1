/**
 * Created by Maxim on 22.03.2017.
 */
var Client = require("ibmiotf");
var appClientConfig = {
    "org" : 'kwxqcy',
    "id" : 'a-kwxqcy-app5',
    "domain": "internetofthings.ibmcloud.com",
    "auth-key" : 'a-kwxqcy-1dw7hvzvwk',
    "auth-token" : 'tsM8N(FS@iOc3CId+5'
}

var deviceСonfig = {
    "org" : "kwxqcy",
    "id" : "ESP8266-12771314",
    "domain": "internetofthings.ibmcloud.com",
    "type" : "BMP180",
    "auth-method" : "token",
    "auth-token" : "12345678"
};

var deviceClient = new Client.IotfDevice(deviceСonfig);
deviceClient.connect();
deviceClient.on('connect', function () {
    console.log('Соединение с устройством успешно')
});

var interval = setInterval(function()
    {
        deviceClient.publish("status","json",'{"d" : {"deviceid":"ESP8266-12771314","param1":"15.00","param2":"19"}}');
        deviceClient.publish("status","json",'{"d" : {"deviceid":"ESP8266-1201913","param1":"7.00","param2":"19"}}');
    }, 5000);



//Подписка на сообщения как приложение
var appClient = new Client.IotfApplication(appClientConfig);
appClient.connect();
appClient.on("connect", function () {
    appClient.subscribeToDeviceEvents();
});
appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {

    console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);

});