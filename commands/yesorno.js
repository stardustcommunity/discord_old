const Command = require('./command.js')
class YesOrNo extends Command {
    static match(message) {
        return this.startsWith(message, 'yesorno') || this.startsWith(message, 'yes') || this.startsWith(message, 'no')
    }

    static action(message) {
      message.channel.startTyping()
      setTimeout(() => {
        const axios = require('axios')
        axios.get('https://yesno.wtf/api').then((response) => {
          var to_send = response.data.answer.charAt(0).toUpperCase() + response.data.answer.slice(1) + " " + response.data.image
          message.channel.stopTyping();
          message.reply(to_send)
        }).catch(() => {
          message.reply(message.i18n.error_general)
          message.channel.stopTyping()
          console.log("Error while requesting yesno.wtf api");
        })
      }, Math.floor(Math.random() * (1100 - 300)) + 300)
    }
}
module.exports = YesOrNo
