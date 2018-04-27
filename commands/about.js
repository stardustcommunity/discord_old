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
            title: "Stardust bot",
            description: "Un bot pour la communauté",
            fields: [
                {
                    "name": "Version",
                    "value": process.env.APP_VERSION
                },
                {
                    "name": "Environment",
                    "value": process.env.APP_ENVIRONMENT
                },
                {
                    "name": "Uptime",
                    "value": uptime[0] + ' h, ' + uptime[1] + 'min, ' + uptime[2] + 'sec'
                },
                {
                    "name": "Created by",
                    "value": "<@169164454255263745>"
                },
            ]
        }
        message.channel.send(new Discord.RichEmbed(data))
    }
}
module.exports = About