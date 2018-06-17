const Command = require("./command.js");
class Help extends Command {
  static match(message) {
    return this.startsWith(message, "help");
  }

  static action(message) {
    message.channel
      .send("", {
        embed: {
          title: message.i18n.help.title,
          description: message.i18n.help.description,
          color: 16093728,
          fields: [
            {
              name:"!!ping",
              value: message.i18n.help.fields.ping
            },
            {
              name:"!!chucknorrisfact",
              value: message.i18n.help.fields.chucknorrisfact
            },
            {
              name: "!!yesorno",
              value: message.i18n.help.fields.yesorno
            },
            {
              name: "!!radio start",
              value: message.i18n.help.fields.radio_start
            },
            {
              name: "!!radio stop",
              value: message.i18n.help.fields.radio_stop
            },
            {
              name: "!!radio info",
              value: message.i18n.help.fields.radio_info
            },
            {
              name: "!!about",
              value: message.i18n.help.fields.about
            }
          ]
        }
      })
  }
}
module.exports = Help;
