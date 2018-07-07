const  Command = require('./command.js')
class Stardust extends Command {
    static match(message) {
       var content = message.content
       return content.includes('d\'étoile') || content.includes('d\'étoiles') || content.includes('d\'etoile') || content.includes('d\'toiles') && message.isMentioned(message)
    }

    static action(message) {
      message.reply(message.i18n.stardust_congrat[Math.floor(Math.random() * message.i18n.stardust_congrat.length)])
    }
}
module.exports = Stardust
