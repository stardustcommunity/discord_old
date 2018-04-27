const Command = require('./command.js')
class RadioStop extends Command {
    static match(message) {
        return this.startsWith(message, 'radio stop')
    }

    static action(message) {
        if (message.client.voiceConnections.first() === undefined){
            message.reply("Bah... comment dire... je suis pas connecté à un channel vocal donc bon ça risque pas de déranger quelqu'un")
        }else{
            message.client.voiceConnections.first().disconnect()
            message.reply('Alors comme ça on aime pas ma musique ?')
            console.log('Radio stop intend by user')
        }
    }
}
module.exports = RadioStop