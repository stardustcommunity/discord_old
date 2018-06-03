const  Command = require('./command.js')
const Discord = require("discord.js");
const { ms, s, m, h, d } = require('time-convert')

class About extends Command {
    static match(message) {
        return this.startsWith(message, 'about')
    }

    static action(message) {
        var uptime = ms.to(h,m,s)(message.client.uptime)
        var data = {
            title: message.i18n.about.title,
            description: message.i18n.about.description,
            fields: [
                {
                    "name": message.i18n.about.version,
                    "value": process.env.APP_VERSION
                },
                {
                    "name": message.i18n.about.environment,
                    "value": process.env.APP_ENVIRONMENT
                },
                {
                    "name": message.i18n.about.uptime,
                    "value": uptime[0] + ' h, ' + uptime[1] + 'min, ' + uptime[2] + 'sec'
                },
                {
                    "name": message.i18n.about.created_by,
                    "value": "<@169164454255263745>"
                },
            ]
        }
        message.channel.send(new Discord.RichEmbed(data))
    }
}
module.exports = About
