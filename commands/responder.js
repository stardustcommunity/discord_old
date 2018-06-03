const  Command = require('./command.js')
class Responder extends Command {
    static match(message) {
        return message.isMentioned(message.client.user)
    }

    static action(message) {
        message.channel.startTyping()
        setTimeout(() => {
          message.channel.stopTyping();
          var when_mentioned = message.i18n.when_mentioned
          message.reply(when_mentioned[Math.floor(Math.random() * when_mentioned.length)])
        }, Math.floor(Math.random() * (1100 - 300)) + 300)
    }
}
module.exports = Responder
