const Command = require('./command.js')
class Radio extends Command {
    static match(message) {
        return this.startsWith(message, 'radio start')
    }

    static action(message) {
        if (message.client.voiceConnections.first() == undefined) {
            if (message.member.voiceChannel) {
                if (message.member.voiceChannel.id == process.env.DISCORD_RADIO_VOICE_CHANNEL_ID) {
                    message.member.voiceChannel.join()
                        .then(connection => { // Connection is an instance of VoiceConnection
                            const dispatcher = connection.playArbitraryInput('http://streaming.radionomy.com/Stardust');

                            // const dispatcher = connection.playFile("D:\\Users\\mbess\\Music\\Developers.mp3");
                            // const dispatcher = connection.playBroadcast()
                            // Store.state.StreamDispatcher = dispatcher
                            console.log('new radio dispatcher')
                            // dispatcher.setVolume(); // Set the volume to 50%
                            message.reply(":musical_note: C'est parti!");

                            dispatcher.on('end', () => {
                                // message.client.channels.find('id', process.env.DISCORD_RADIO_TEXT_CHANNEL_ID).send(":warning: Il semblerait que le flux audio se soit arrêté!")

                                console.log('end of the music!')

                                // message.member.voiceChannel.leave()
                            });

                            dispatcher.on('error', e => {

                                message.client.channels.find('id', process.env.DISCORD_RADIO_TEXT_CHANNEL_ID).send(":warning: Erreur: Une erreur fatale est survenu lors de la lecture du flux audio. <@169164454255263745> tu fait quoi ?!")

                                // Catch any errors that may arise
                                console.log('ERROR: so end of the music! :')
                                console.log(e);

                                message.member.voiceChannel.leave()
                            });


                        })
                        .catch(console.log);
                } else {
                    message.reply(":warning: C'est dommage mais là je peux pas venir dans ton channel car c'est pas le bon, va dans \"Stardust Radio\"");
                }
            } else {
                message.reply(":warning: Hum, j'ai pas l'intention de jouer ma musique devant une salle... vide, rejoins un channel vocal avant de venir me parler!");
            }
        } else {
            if (message.member.voiceChannel.id == process.env.DISCORD_RADIO_VOICE_CHANNEL_ID) {

                message.reply(":warning: Ahhh! tu pensais vraiment m'avoir ! Tu est déjà en train de m'écouter");

            } else {
                message.reply(":warning: Whoops! Je suis déjà entrain de jouer ma musique dans un autre channel!");

            }
        }
    }
}
module.exports = Radio