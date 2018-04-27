const axios = require('axios')
const convert = require('xml-js');
const Discord = require("discord.js");
class RadionomyWatcher {
    constructor(discordClient) {
        console.log(discordClient.channels  )
        this.discordClient = discordClient;
        // this.radioUid = radioUid;
        // this.textChannelId = textChannelId;
    }

    newLoop() {
        console.log('new loop called')

        var radioUid = process.env.RADIONOMY_RADIO_UID
        var textChannelId = process.env.DISCORD_RADIO_TEXT_CHANNEL_ID

        axios.get(
            "http://api.radionomy.com/currentsong.cfm?radiouid=" + radioUid + "&type=xml&cover=yes&defaultcover=yes&size=90&dynamicconf=yes"
            , {
                timeout: 99999999
            }).then(response => {
            var parsedResponse = convert.xml2js(response.data).elements[0].elements[5].elements;
            var track = {
                unique_id: parsedResponse[0].elements[0].text,
                title: parsedResponse[1].elements[0].text,
                artists: parsedResponse[2].elements[0].text,
                start_time: parsedResponse[3].elements[0].text,
                play_duration: parsedResponse[4].elements[0].text,
                current: parsedResponse[5].elements[0].text,
                cover: parsedResponse[6].elements[0].text,
            }

            console.log(track)

            this.discordClient.channels.find('id', textChannelId).send(new Discord.RichEmbed({
                title: "Je joue en ce moment",
                description: track.title + ' - ' + track.artists,
                image: {
                    url: track.cover
                },
            }))

            //convert form msec to sec
            // var haveToWait = track.play_duration / 1000

            // setTimeout(() => {
            //     this.newLoop()
            // }, track.play_duration);
        }).catch(function (error) {
            console.log(error);
        });
    }

}
module.exports = RadionomyWatcher