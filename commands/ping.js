const  Command = require('./command.js')
class Ping extends Command {
    static match(message) {
        return this.startsWith(message, 'ping')
    }

    static action(message) {
        message.channel.send('Pong!')
    }
}
module.exports = Ping
