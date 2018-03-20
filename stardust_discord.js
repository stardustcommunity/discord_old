const Discord = require("discord.js");
const client = new Discord.Client();
var elasticsearch = require('elasticsearch');
var elasticsearchClient = new elasticsearch.Client({
    host: 'https://logger:KQSKSAAADSK23299392@elasticsearch.stan-tab.fr:443',
    log: 'trace'
});
//const express = require('express')
//const app = express()
const Ping = require('./commands/ping')
const Clear = require('./commands/clear')
const MessageLogger = require('./App/MessageLogger')
const MessageRuler = require('./App/MessageRuler')

client.on('ready', function () {
    client.user.setActivity('servir la communauté');

    console.log('Bot ready!');
});


var cron = require('node-cron');
const Webhook = require("webhook-discord")
const Hook = new Webhook("https://discordapp.com/api/webhooks/425745192394686484/hbJ4d3fCx4P6uW0ugONyR1lAfEtmGOnui-TRUt0s6NmKdHcNBEY3mDQI_EXmORcJfPf_")
var Lun = require("lun-phase");
var lun = new Lun();
cron.schedule('0 0 * * *', function(){
    var now = lun.now();
    Hook.info("Lunar phase", 'Today is\'t ' + now.name + ' ' + now.emoji + ' Age:' + now.age + ' Phase: ' + now.phase)
});

client.on('message', function (msg) {
    Ping.parse(msg) || Clear.parse(msg)
    MessageLogger.newMessage(msg, elasticsearchClient)
    MessageRuler.newMessage(msg);
});

//app.get('/send/:text', function (req, res) {
//  var channel = client.channels.get('332195123880525824');
//channel.send(req.params.text);
//return res.send('done!');
//})
//
// client.on('message', function (msg){
//     var commandUsed = SimpleMessage.parse(msg);
// });

//app.listen(3000, function () {
// console.log('Example app listening on port 3000!')
//})

client.login('NDE5MjMzNzc0NTA1NTU4MDE4.DXtJag.lj7iI2fTdyQVkLyW14KxpylN9gE');