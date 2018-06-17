const axios = require('axios')
const convert = require('xml-js')
const Discord = require("discord.js")
const RadioMetas = require('../App/RadioMetas.js')
var moment = require('moment');
class RadionomyWatcher {
    constructor(discordClient, i18n) {
        this.discordClient = discordClient;
        this.i18n = i18n;
        this.textChannelId = process.env.DISCORD_RADIO_TEXT_CHANNEL_ID;
    }

    newLoop() {
        if (this.discordClient.voiceConnections.first() !== undefined) {
            if (this.discordClient.voiceConnections.first().channel.members.first().id == this.discordClient.user.id) {
              this.discordClient.voiceConnections.first().disconnect()
              console.log('disconnected from voiceConnection because none client listening.')
            }
        }
        const context = new RadioMetas()
        context.getMetas().then(response => {

          var track = response.track

          if (response.is_ad) {
            var showed_title = this.i18n.radio.ad
            var volume = 0
          }else{
            var showed_title = track.title + " - " + track.artists
            var volume = 1
          }

          if (this.discordClient.voiceConnections.first() !== undefined) {
              console.log(this.discordClient.voiceConnections.first().dispatcher.setVolume(volume))

              this.discordClient.channels.find('id', this.textChannelId).send(new Discord.RichEmbed({
                  title: "Je joue en ce moment",
                  description: showed_title,
                  image: {
                      url: track.cover
                  }
              }))
          }
          this.discordClient.user.setActivity(showed_title, { type: 'LISTENING' })
          console.log("On air : " + showed_title)

          if (response.end_in > -1) {
            setTimeout(() => {
                this.newLoop()
            }, (response.end_in + 1000))
          }else{
              console.log("ERROR: RADIONOMY WATCHER WITH END_IN TIME UNABLE TO SET TIMEOUT FATTAL ERROR")
              console.log("retrying in 120 sec");
              setTimeout(() => {
                  this.newLoop()
              }, (120000))
          }
        }).catch((error) => {
            console.log("ERROR: RADIONOMY WATCHER")
            console.log(error)
            console.log("END OF ERROR: RADIONOMY WATCHER")

            console.log('retrying in 2 sec...')
            setTimeout(() => {
                this.newLoop()
            }, 2000);
        });
    }

}
module.exports = RadionomyWatcher
