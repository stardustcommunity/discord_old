const  Command = require('./command.js')
class Stardust extends Command {
    static match(message) {
       var content = message.content
       return content.includes('étoile') || content.includes('étoiles') || content.includes('etoile') || content.includes('etoiles') && message.isMentioned(message)
    }

    static action(message) {
      message.reply(message.i18n.__('stardust_congrat')[Math.floor(Math.random() * message.i18n.__('stardust_congrat').length)])
    }
}
module.exports = Stardust
