const Command = require('./command.js')
const request = require('request')

class Minecraft extends Command {
    static match(message) {
        if(this.startsWith(message, 'minecraft start')){
        	return this.startsWith(message, 'minecraft start')
        }if(this.startsWith(message, 'minecraft stop')){
        	return this.startsWith(message, 'minecraft stop')
    	}if(this.startsWith(message, 'minecraft status')){
        	return this.startsWith(message, 'minecraft status')
    	}
    }

    static action(message) {
    	if(this.startsWith(message, 'minecraft start')){
  			var username = 'JiVhfFwirHvMsHPLMMq4',
			    password = 'Z6dGr2b2N62oUabpbrb2k5yPLvZCSN',
			    url = 'https://' + username + ':' + password + '@api.lefuturiste.fr/minecraft/mc01/start';

        	message.channel.send("Ok! une requete à été envoyé à notre tortue très maline qui va voire si elle peut allumer le serveur!")
			request({
				url: url
			}, function (error, response, body) {
			   if(response.statusCode == 500){        
        			message.channel.send("La tortue ta répondu : \"mdr! t'es bête ou quoi? tu va pas démarrer un serveur qui est déjà allumé!\"")
        		}else{
        			message.channel.send("La tortue ta répondu : \"Le serveur est en cours de démarrage, dans 1 ou 30sec ça devrait le faire.\"")
        		}
			});
        }if(this.startsWith(message, 'minecraft stop')){
  			var username = 'JiVhfFwirHvMsHPLMMq4',
			    password = 'Z6dGr2b2N62oUabpbrb2k5yPLvZCSN',
			    url = 'https://' + username + ':' + password + '@api.lefuturiste.fr/minecraft/mc01/shutdown';


        	message.channel.send("Ok! une requete à été envoyé à notre tortue très maline qui va voire si elle peut débrancher le serveur!")
			request({
				url: url
			}, function (error, response, body) {
			   if(response.statusCode == 500){        
        			message.channel.send("problème! peut être que le serveur est occupé par des personnes! effectivement t'es bête!!!")
        		}else{
        			message.channel.send("serveur arrêté : bah bravo!!! ta arrêté le serveur !! t'es serieux là ???")
        		}
			});
    	}if(this.startsWith(message, 'minecraft status')){

  			var username = 'JiVhfFwirHvMsHPLMMq4',
			    password = 'Z6dGr2b2N62oUabpbrb2k5yPLvZCSN',
			    url = 'https://' + username + ':' + password + '@api.lefuturiste.fr/minecraft/mc01/status';

			request({
				url: url
			}, function (error, response, body) {
			   message.channel.send("débrouille toi avec ça! ```" + body + "```")
			});
    	}
    }
}
module.exports = Minecraft