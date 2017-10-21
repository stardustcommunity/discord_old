const Discord = require("discord.js");
const client = new Discord.Client();
//const express = require('express')
//const app = express()
const Ping = require('./commands/ping')
const Minecraft = require('./commands/minecraft')

client.on('ready', function () {
    client.user.setGame('être un esclave');
    console.log('Bot ready!');
});

client.on('message', function (msg){
    var commandUsed = Ping.parse(msg) || Minecraft.parse(msg);
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

client.login('MzMyOTA2MTUyMTI5OTg2NTYy.DMKa7g.egmPngr5FPzBU8DAKjOzV9IzxDs');