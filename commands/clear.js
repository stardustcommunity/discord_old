const Command = require('./command.js')
class Clear extends Command {
    static match(message) {
        return this.startsWith(message, 'clear')
    }

    static action(message) {
        message.channel.startTyping()
        if (message.member.permissions.has("MANAGE_MESSAGES", true)) {
            let args = message.content.split(' ');
            if (args[1] === "all") {
                message.channel.fetchMessages()
                    .then((messages) => {
                        var siz = messages.size;
                        for (var i = 0; i < siz; i++) {
                            messages.array()[i].delete()
                        }
                        message.author.send(message.i18n.__('clear.all'))
                    })
                    .catch(console.error);
            } else {

                if (parseInt(args[1]) < 1) {
                    var toDel = 0;
                }
                else if (parseInt(args[1]) == "NaN") {
                    var toDel = 0;
                }else{
                    var toDel = args[1];
                }
                console.log(toDel);

                if (toDel > 0) {

                  message.channel.fetchMessages({limit: toDel})
                      .then((messages) => {
                          var size = messages.size;
                          for (var i = 0; i < size; i++) {
                              messages.array()[i].delete()
                          }
                          message.author.send(message.i18n.__('clear.some', size))
                          // message.author.send("**" + siz + "** message(s) viennent d'être supprimé")
                      })
                      .catch(console.error);
                }else{

                  message.author.send(message.i18n.__('clear.some', 0))
                }
            }
        } else {
            message.author.send(message.i18n.__('clear').permissions_invalid)
        }        
        message.channel.stopTyping();
    }
}
module.exports = Clear
