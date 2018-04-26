const Command = require('./command.js')
const Store = require('../Store')
class Radio extends Command {
    static match(message) {
        return this.startsWith(message, 'radio start')
    }

    static action(message) {
        if (message.member.voiceChannel) {
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
                        console.log('end of the music!')
                        message.member.voiceChannel.leave()
                    });

                    dispatcher.on('error', e => {
                        // Catch any errors that may arise
                        console.log('ERROR: so end of the music! :')
                        console.log(e);

                        message.member.voiceChannel.leave()
                    });


                })
                .catch(console.log);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
}
module.exports = Radio