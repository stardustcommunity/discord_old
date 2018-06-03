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
                        message.author.send(message.i18n.clear.all)
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
                          message.author.send("**" + size + "** " + message.i18n.clear.some)
                      })
                      .catch(console.error);
                }else{

                  message.author.send("**0** " + message.i18n.clear.some)
                }
            }
        } else {
            message.author.send(message.i18n.clear.permissions_invalid)
        }
        message.channel.stopTyping();
    }
}
module.exports = Clear
