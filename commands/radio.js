const Command = require("./command.js");
class Radio extends Command {
  static match(message) {
    return this.startsWith(message, "radio start");
  }

  static action(message) {
    message.channel.startTyping();
    if (message.client.voiceConnections.first() == undefined) {
      if (message.member.voiceChannel) {
        if (
          message.member.voiceChannel.id ==
          process.env.DISCORD_RADIO_VOICE_CHANNEL_ID
        ) {
          message.member.voiceChannel
            .join()
            .then(connection => {
              // Connection is an instance of VoiceConnection
              const dispatcher = connection.playArbitraryInput(
                "http://streaming.radionomy.com/Stardust"
              );

              console.log("new radio dispatcher");
              //
              // dispatcher.setVolume(1);

              message.reply(message.i18n.radio.start.success);

              dispatcher.on("end", () => {
                // message.client.channels.find('id', process.env.DISCORD_RADIO_TEXT_CHANNEL_ID).send(":warning: Il semblerait que le flux audio se soit arrêté!")

                console.log("end of the music!");

                // message.member.voiceChannel.leave()
              });

              dispatcher.on("error", e => {
                message.client.channels
                  .find("id", process.env.DISCORD_RADIO_TEXT_CHANNEL_ID)
                  .send(message.i18n.radio.start.error);

                // Catch any errors that may arise
                console.log("ERROR: so end of the music! :");
                console.log(e);

                message.member.voiceChannel.leave();
              });
            })
            .catch(console.log);
        } else {
          message.reply(message.i18n.radio.start.invalid_channel);
        }
      } else {
        message.reply(message.i18n.radio.start.nobody);
      }
    } else {
      if (
        message.member.voiceChannel.id ==
        process.env.DISCORD_RADIO_VOICE_CHANNEL_ID
      ) {
        message.reply(message.i18n.radio.start.already_here);
      } else {
        message.reply(message.i18n.radio.start.already);
      }
    }
    message.channel.stopTyping();
  }
}
module.exports = Radio;
