console.log("Starting the bot...");

/**
  DOT ENV
**/
require('dotenv').config()

const Discord = require("discord.js");
const client = new Discord.Client();

/**
 * Twitch
 */
const twitchWebhook = new (require('./App/TwitchWebhook'))({
  clientId: process.env.TWITCH_CLIENT_ID,
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  endpoint: process.env.TWITCH_WEBHOOK_ENDPOINT,
  userId: process.env.TWITCH_USER_ID, // lefuturiste_test: 521530994 vicnetstardust: 256280316
  webhookSecret: process.env.TWITCH_WEBHOOK_SECRET
})

/**
 * Express App
 */
const express = require('express')
const app = express()

app.use(bodyParser.json({verify:function(req,res,buf){req.rawBody=buf}}))

app.get('/', (req, res) => {
  res.json({success: true})
})
app.get('/notify', (req, res) => {
  console.log('> Twitch: got challenge: ', req.query)
  res.set('Content-Type', 'text/plain; charset=utf-8')
  res.send(req.query['hub.challenge'])
})
app.post('/notify', (req, res) => {
  console.log('> Twitch: got notification: ', req.body, req.headers)
  twitchWebhook.handleWebhook(req, client)
  res.json({success: true})
})

/**
  I18N
**/
var i18n = require('./locales/fr.json')

/**
  ELASTICSARCH
**/
var elasticsearch = require('elasticsearch');
var elasticsearchClient = new elasticsearch.Client({
    host: process.env.ELASTICSEARCH_URL,
    log: false
});

/**
  READY EVENT
**/
client.on('ready', () => {
    client.user.setActivity(i18n.default_activity)
    console.log('=========== Bot ready! ===========')

    setTimeout(() => {
      // RADIONOMY
      const RadionomyWatcher = require('./App/RadionomyWatcher')
      const RadionomyWatcherInstance = new RadionomyWatcher(client, i18n)
      RadionomyWatcherInstance.newLoop()
    }, 1)
});

/**
  CRON
  - moon
**/
// var cron = require('node-cron');
// const Webhook = require("webhook-discord")
// const Hook = new Webhook("https://discordapp.com/api/webhooks/425745192394686484/hbJ4d3fCx4P6uW0ugONyR1lAfEtmGOnui-TRUt0s6NmKdHcNBEY3mDQI_EXmORcJfPf_")
// var Lun = require("lun-phase");
// var lun = new Lun();
// cron.schedule('0 0 * * *', function () {
//     var now = lun.now();
//     Hook.info("Lunar phase", 'Today is\'t ' + now.name + ' ' + now.emoji + ' Age:' + now.age + ' Phase: ' + now.phase)
// });

/**
  MESSAGE EVENT
**/
//load modules
const Help = require('./commands/help')
const Ping = require('./commands/ping')
const Clear = require('./commands/clear')
const Radio = require('./commands/radio')
const RadioInfo = require('./commands/radio_info')
const RadioLyrics = require('./commands/radio_lyrics')
const Stop = require('./commands/radio_stop')
const Env = require('./commands/env')
const About = require('./commands/about')
const Responder = require('./commands/responder')
const StardustResponder = require('./commands/stardust')
const RandomChuckNorrisFact = require('./commands/randomchucknorrisfact')
const YesOrNo = require('./commands/yesorno')
const MessageLogger = require('./App/MessageLogger')
const MessageRuler = require('./App/MessageRuler')
client.on('message', (msg) => {
    msg.i18n = i18n
    Help.parse(msg)
    || Ping.parse(msg)
    || Clear.parse(msg)
    || StardustResponder.parse(msg)
    || YesOrNo.parse(msg)
    || RandomChuckNorrisFact.parse(msg)
    || Radio.parse(msg)
    || RadioInfo.parse(msg)
    || RadioLyrics.parse(msg)
    || Stop.parse(msg)
    || About.parse(msg)
    || Env.parse(msg)
    || Responder.parse(msg);
    // MessageLogger.newMessage(msg, elasticsearchClient)
    MessageRuler.newMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);
console.log('after that')