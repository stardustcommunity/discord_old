# Discord

The main discord bot of the discord guild/server

## Main features

- [Stardust Radio](https://www.radionomy.com/fr/radio/stardust) streaming by discord voice connection
- Message watcher & ruler : Verify the content of the message and the integrity
- Moderation tools & commands
- And some easter eggs !!

## Made with

- [Node.Js](http://nodejs.org/)
- [Discord.Js](https://discord.js.org/#)
- See `package.json` :joy:

## Installation

- Clone this repository
- `npm install`

## Run

`node stardust_discord.js`

or with [PM2](http://pm2.keymetrics.io/)

`pm2 start stardust_discord.js`

## Development

File watcher with [Nodemon](https://github.com/remy/nodemon)

`nodemon stardust_discord.js`

## Twitch

Using [httpie](https://httpie.org/) as cli http client

### See all subscriptions

`http https://api.twitch.tv/helix/webhooks/subscriptions `

### Get token

`POST https://id.twitch.tv/oauth2/token?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&grant_type=client_credentials`

### Get user id

`http GET https://api.twitch.tv/helix/users?login=CHANNEL_SLUG Client-ID:YOUR_CLIENT_ID`

### Subscribe/Unsubscribe

For example to subscribe the url https://example.com/notify (url can be non https) to all the streams event (UP/DOWN stream) use this command:

```
http POST https://api.twitch.tv/helix/webhooks/hub \
hub.mode=[un]subscribe \
hub.callback=https://example.com/notify \
hub.lease_seconds=864000 \
hub.secret=YOUR_SECRET \
hub.topic=https://api.twitch.tv/helix/streams?user_id=YOUR_USER_ID \
'Authorization: Bearer YOUR_TOKEN'
```

or hub.topic=https://api.twitch.tv/helix/users/follows?first=1&to_id=YOUR_USER_ID to get notifed about new users
