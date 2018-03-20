const urlRegex = require('url-regex');
class MessageRuler {
    static newMessage(message) {
        // if (message.author.id != 419233774505558018){
        //
        // }
        if (message.channel.name == 'partage' && message.author.id != 419233774505558018) {
            if (!urlRegex({exact: false, strict: false}).test(message.content)) {
                message.author.send("Dans le channel #partage, un message ne contenant pas d'url est considéré comme étant spam. Aussi nous avons supprimé ce message. Si vous avez une réclamation, contacter les Modérateurs.")
                message.delete()
            }
        }
    }

}
module.exports = MessageRuler