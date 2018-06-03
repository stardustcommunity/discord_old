const Command = require('./command.js')
const Discord = require("discord.js");
const axios = require('axios')
const convert = require('xml-js');
const RadioMetas = require('../App/RadioMetas.js')
class RadioInfo extends Command {
    static match(message) {
        return this.startsWith(message, 'radio info') || this.startsWith(message, 'radio now') || this.startsWith(message, 'radio fuck')
    }

    static action(message) {
        message.channel.startTyping();
        const context = new RadioMetas()
        context.getMetas().then(response => {
            message.channel.send(new Discord.RichEmbed({
                title: message.i18n.radio.info.embed_title,
                description: response.track.title + ' - ' + response.track.artists,
                image: {
                    url: response.track.cover
                },
            }))

            message.channel.stopTyping();
        }).catch(function (error) {
            console.log(error);
            message.reply(message.i18n.radio.info.error + " ``` HTTP ERROR AXIOS " + error.error.code +     "```")

            message.channel.stopTyping();
        });
    }
}
module.exports = RadioInfo
