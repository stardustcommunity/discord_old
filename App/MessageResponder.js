const urlRegex = require('url-regex');
class MessageResponder {
    static newMessage(message) {
        if(message.isMentioned(message.client.user)){
          message.reply(message.i18n.__('when_mentioned')[Math.floor(Math.random() * message.i18n.__('when_mentioned').length)])  
        }
    }

}
module.exports = MessageResponder
