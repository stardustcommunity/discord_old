class Command {
    static parse(message, context = {}) {
        if (this.match(message)){
            this.action(message)
            return true
        }
        return false
    }

    static match(message) {
        return false
    }

    static action(message) {
    }

    static startsWith(message, value){
        return message.content.startsWith('!!' + value)
    }
}
module.exports = Command
