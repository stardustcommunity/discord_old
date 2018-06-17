const Command = require('./command.js')
const Discord = require("discord.js");
const axios = require('axios')
const convert = require('xml-js');
const RadioMetas = require('../App/RadioMetas.js')
class RadioLyrics extends Command {
    static match(message) {
        return this.startsWith(message, 'radio lyrics') || this.startsWith(message, 'radio lyric')
    }

    static action(message) {
        message.channel.startTyping();
        const context = new RadioMetas()
        context.getMetas().then(response => {

            message.channel.send(message.i18n.radio.info.lyrics + " " + response.lyrics_url)

            message.channel.stopTyping();
        }).catch(function (error) {
            console.log(error);
            message.reply(message.i18n.radio.info.error + " ``` HTTP ERROR AXIOS " + error.error.code +     "```")

            message.channel.stopTyping();
        });
    }
}
module.exports = RadioLyrics
