const Command = require('./command.js')
class RadioStop extends Command {
    static match(message) {
        return this.startsWith(message, 'radio stop')
    }

    static action(message) {
        if (message.client.voiceConnections.first() === undefined){
            message.reply(message.i18n.radio.stop.no_connections)
        }else{
            message.client.voiceConnections.first().disconnect()
            message.reply(message.i18n.radio.stop.success)
            console.log('Radio stop intend by user')
        }
    }
}
module.exports = RadioStop
