const  Command = require('./command.js')
class Responder extends Command {
    static match(message) {
        return message.isMentioned(message.client.user)
    }

    static action(message) {
        message.channel.startTyping()
        setTimeout(() => {
          message.channel.stopTyping();
          message.reply(message.i18n.__('when_mentioned')[Math.floor(Math.random() * message.i18n.__('when_mentioned').length)])
        }, Math.floor(Math.random() * (1100 - 300)) + 300)
    }
}
module.exports = Responder
