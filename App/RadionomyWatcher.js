const axios = require('axios')
const convert = require('xml-js');
const Discord = require("discord.js");
var moment = require('moment');
class RadionomyWatcher {
    constructor(discordClient) {
        console.log(discordClient.channels)
        this.discordClient = discordClient;
        // this.radioUid = radioUid;
        // this.textChannelId = textChannelId;
    }

    newLoop() {
        console.log('new loop called')
        var textChannelId = process.env.DISCORD_RADIO_TEXT_CHANNEL_ID
        axios.get(
            "https://api.stardustcommunity.ga/radio/info"
            ).then(response => {
                console.log('called')
                var track = response.data.data.track
                var time = response.data.data.time

                if (track.title == "Advert:TargetSpot") {
                    console.log('Publicité!')
                    if (this.discordClient.voiceConnections.first() !== undefined) {
                        console.log(this.discordClient.voiceConnections.first().dispatcher.setVolume(0))

                        this.discordClient.channels.find('id', textChannelId).send(new Discord.RichEmbed({
                            title: "Je joue en ce moment",
                            description: 'Petite page de publicité',
                            image: {
                                url: track.cover
                            },
                        }))
                    }

                    this.discordClient.user.setActivity('Petite page de publicité', { type: 'LISTENING' })
                }else{
                    console.log('PAS DE Publicité!')

                    if (this.discordClient.voiceConnections.first() !== undefined) {
                        this.discordClient.voiceConnections.first().dispatcher.setVolume(1)
                        this.discordClient.channels.find('id', textChannelId).send(new Discord.RichEmbed({
                            title: "Je joue en ce moment",
                            description: track.title + ' - ' + track.artists,
                            image: {
                                url: track.cover
                            },
                        }))
                    }

                    console.log(this.discordClient.user.setActivity(track.title + ' - ' + track.artists, { type: 'LISTENING' }))
                }

                console.log("On air : " + track.title + " - " + track.artists)

                //convert form msec to sec
                // var haveToWait = track.play_duration / 1000

                setTimeout(() => {
                    console.log('next music')
                    this.newLoop()
                }, (time.end_in.seconds + 8 ) * 1000);
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