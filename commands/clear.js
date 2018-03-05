const Command = require('./command.js')
class Clear extends Command {
    static match(message) {
        return this.startsWith(message, 'clear')
    }

    static action(message) {
        if (message.member.permissions.has("MANAGE_MESSAGES", true)) {
            let args = message.content.split(' ');
            if (args[1] === "all") {
                message.channel.fetchMessages()
                    .then(function (messages) {
                        var siz = messages.size;
                        for (var i = 0; i < siz; i++) {
                            messages.array()[i].delete()
                        }
                        message.author.send("Des messages ont été supprimé avec succès")
                    })
                    .catch(console.error);
            } else {
                if (parseInt(args[1]) > 100) {
                    args[1] = 100;
                }
                message.channel.fetchMessages({limit: parseInt(args[1])})
                    .then(function (messages) {
                        var siz = messages.size;
                        for (var i = 0; i < siz; i++) {
                            messages.array()[i].delete()
                        }
                        message.author.send("**" + siz + "** message(s) viennent d'être supprimé")
                    })
                    .catch(console.error);
            }
        } else {
            message.author.send("Sorry man man man ");
        }

    }
}
module.exports = Clear