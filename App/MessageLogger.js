// const uuidv1 = require('uuid/v1');
var hash = require('object-hash');
class MessageLogger {
    static newMessage(message, elasticsearchClient) {
        if (message.author.bot == false) {
            elasticsearchClient.create({
                index: 'stardust-community',
                type: 'messages',
                id: message.id,
                body: {
                    user: {
                        id: message.author.id,
                        username: message.author.username,
                        nickname: message.member.nickname,
                        joinedAt: message.member.joinedAt,
                        avatar: message.author.displayAvatarURL,
                        tag: message.author.tag
                    },
                    channel: {
                        id: message.channel.id,
                        name: message.channel.name
                    },
                    content: message.content,
                    created_at: message.createdAt
                }
            }, function (error, response) {
                // ...
            });
            var user = {
                username: message.author.username,
                nickname: message.member.nickname,
                joinedAt: message.member.joinedAt,
                avatar: message.author.displayAvatarURL,
                tag: message.author.tag
            }
            user['hash'] = hash(user)
            elasticsearchClient.exists({
                index: 'stardust-community',
                type: 'users',
                id: message.author.id
            }, function (error, exists) {
                if (exists === true) {
                    console.log('getting existing user...')
                    elasticsearchClient.get({
                        index: 'stardust-community',
                        type: 'users',
                        id: message.author.id
                    }, function (error, response) {
                        if (response._source.hash != user['hash']) {
                            //update the user's profile
                            console.log('updating existing user...')
                            elasticsearchClient.index({
                                index: 'stardust-community',
                                type: 'users',
                                id: message.author.id,
                                body: user
                            })
                        }
                    })
                } else {
                    elasticsearchClient.create({
                        index: 'stardust-community',
                        type: 'users',
                        id: message.author.id,
                        body: user
                    })
                }
            });
        }
    }

}
module.exports = MessageLogger