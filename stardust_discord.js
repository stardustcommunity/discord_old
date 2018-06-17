console.log("Starting the bot...");

const Discord = require("discord.js");
const client = new Discord.Client();

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
  DOT ENV
**/
require('dotenv').config()

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
var cron = require('node-cron');
const Webhook = require("webhook-discord")
const Hook = new Webhook("https://discordapp.com/api/webhooks/425745192394686484/hbJ4d3fCx4P6uW0ugONyR1lAfEtmGOnui-TRUt0s6NmKdHcNBEY3mDQI_EXmORcJfPf_")
var Lun = require("lun-phase");
var lun = new Lun();
cron.schedule('0 0 * * *', function () {
    var now = lun.now();
    Hook.info("Lunar phase", 'Today is\'t ' + now.name + ' ' + now.emoji + ' Age:' + now.age + ' Phase: ' + now.phase)
});

/**
  MESSAGE EVENT
**/
//load modules
const Ping = require('./commands/ping')
const Clear = require('./commands/clear')
const Radio = require('./commands/radio')
const RadioInfo = require('./commands/radio_info')
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
    Ping.parse(msg) || Clear.parse(msg) || StardustResponder.parse(msg) || YesOrNo.parse(msg) || RandomChuckNorrisFact.parse(msg) || Radio.parse(msg) || RadioInfo.parse(msg) || Stop.parse(msg) || About.parse(msg) || Env.parse(msg) || Responder.parse(msg)
    // MessageLogger.newMessage(msg, elasticsearchClient)
    MessageRuler.newMessage(msg);
});

client.login(process.env.DISCORD_TOKEN);
