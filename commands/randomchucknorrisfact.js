const Command = require('./command.js')
class RandomChuckNorrisFact extends Command {
    static match(message) {
        return this.startsWith(message, 'chucknorris')
    }

    static action(message) {
      message.channel.startTyping()
      setTimeout(() => {
        var to_send = ""
        const chucknorris = require('../locales/chucknorrisfacts.json')
        to_send = chucknorris[Math.floor(Math.random() * chucknorris.length)]
        message.channel.stopTyping();
        message.reply(to_send)
      }, Math.floor(Math.random() * (1100 - 300)) + 300)
    }
}
module.exports = RandomChuckNorrisFact
