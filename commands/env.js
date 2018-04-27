const  Command = require('./command.js')
const Discord = require("discord.js");

class Env extends Command {
    static match(message) {
        return this.startsWith(message, 'verbose-env')
    }

    static action(message) {
        message.reply('Ok!')
        console.log(process.env)
    }
}
module.exports = Env