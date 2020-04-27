const fs = require('fs')
const axios = require('axios')
const moment = require('moment')

module.exports = class TwitchWebhook {

    constructor(options = {}) {
        // 256280316
        this.options = options
        if (this.options.clientId === undefined || this.options.clientSecret === undefined ||
            this.options.endpoint === undefined || this.options.userId === undefined || this.options.webhookSecret === undefined)
            throw new Error("Invalid options passed to TwitchWebhook")
        this.streamUrl = 'https://api.twitch.tv/helix/streams?user_id=' + this.options.userId
        this.tmpFile = './twitch-tmp-config.json'
        this.baseUrl = "https://api.twitch.tv/helix"
    }

    async loadTwitch() {
        return new Promise(async (resolve, reject) => {
            console.log('> Twitch: reload twitch...')
            let now = moment()
            let store = this.getLocal()
            let renew = true
            if (store !== null) {
                console.log('> Twitch: found store')
                this.token = store.access_token
                let expireAt = moment(store.expire_at)
                renew = now.isAfter(expireAt)
                if (renew)
                    console.log('> Twitch: need to reload the access token token, because expired')
                else
                    console.log('> Twitch: current access token will expire in ' + moment.duration(now.diff(expireAt)).humanize())
            }
            if (renew) {
                let token = (await this.getToken())
                this.token = token.access_token
                console.log('> Twitch: got new access token: ' + this.token)
                token.created_at = now.toISOString()
                token.expire_at = now.add(token.expires_in, 'seconds').toISOString()
                this.saveLocal(token)
            } else {
                console.log('> Twitch: reusing access token: ' + this.token)
            }
            await this.subscribeStreams()
            console.log(await this.getAllSubscriptions())
            resolve()
        })
    }


    /**
     * Will return object : {access_token: 'XXX', expires_in: 215, token_type: 'bearer'}
     */
    async getToken() {
        let res
        try {
            res = await axios.post('https://id.twitch.tv/oauth2/token', {}, {
                params: {
                    client_id: this.options.clientId,
                    client_secret: this.options.clientSecret,
                    grant_type: 'client_credentials'
                }
            })
        } catch (err) {
            console.error('> ERR: Twitch: Cannot get oauth2 token')
            console.error('> ERR: Twitch: Got response code:', err.response.status)
            console.error('> ERR: Twitch: Got response data:', err.response.data)
            return
        }
        return res.data
    }

    async getUser(login) {
        let res
        try {
            res = await axios.get(this.baseUrl + '/users', {
                params: {login},
                ...this.getClientIdConfig()
            })
        } catch (err) {
            console.error('> ERR: Twitch: Cannot get user for: ' + login)
            console.error('> ERR: Twitch: Got response code:', err.response.status)
            console.error('> ERR: Twitch: Got response data:', err.response.data)
            return
        }
        return res.data.data[0]
    }

    async getAllSubscriptions() {
        let res
        try {
            res = await axios.get(this.baseUrl + '/webhooks/subscriptions', this.getAuthConfig())
        } catch (err) {
            console.error('> ERR: Twitch: Cannot get all subscriptions')
            console.error('> ERR: Twitch: Got response code: ', err.response.status)
            console.error('> ERR: Twitch: Got response data: ', err.response.data)
            return
        }
        return res.data
    }

    async changeSubscription(topic, mode = 'subscribe') {
        let callback = this.options.endpoint + '/notify'
        let res
        try {
            res = await axios.post(this.baseUrl + '/webhooks/hub', {
                'hub.mode': mode,
                'hub.callback': callback,
                'hub.lease_seconds': 864000,
                'hub.secret': this.options.webhookSecret,
                'hub.topic': topic
            }, this.getAuthConfig())
        } catch (err) {
            console.log(err)
            console.error('> ERR: Twitch: Cannot change subscribtion of the ' + topic + ' topic with mode ' + mode)
            console.error('> ERR: Twitch: Got response code: ', err.response.status)
            console.error('> ERR: Twitch: Got response data: ', err.response.data)
            return
        }
        console.log('> Twitch: subscribtion changed sucessfully with the ' + topic + 'topic and mode ' + mode + '; got status: ' + res.status)
        return
    }

    /**
     * Will subscribe for streams event
     */
    async subscribeStreams() {
        await this.changeSubscription(this.streamUrl, 'subscribe')
    }

    /**
     * Will unSubscribe for streams event
     */
    async unSubscribeStreams() {
        await this.changeSubscription(this.streamUrl, 'unsubscribe')
    }

    getAuthConfig() {
        return {headers: {Authorization: 'Bearer ' + this.token}}
    }
    
    getClientIdConfig() {
        return {headers: {'Client-ID': this.options.clientId}}
    }

    getOptions() {
        return this.options
    }

    saveLocal(store) {
        let str = JSON.stringify(store)
        fs.writeFileSync(this.tmpFile, str)
        console.log('> Twitch: saved local file ' + this.tmpFile)
    }

    getLocal() {
        if (!fs.existsSync(this.tmpFile))
            return null
        return JSON.parse(fs.readFileSync(this.tmpFile))
    }

    verifySignature(headerContent) {
        const hmac = crypto.createHmac('sha256', this.options.webhookSecret)
        hmac.update(Buffer.from(req.rawBody, 'utf8'))

        return hmac.digest('hex') == headerContent.replace('sha256=', '')
    }

    handleWebhook(req, discordClient) {
        // for now ONLY handle https://api.twitch.tv/helix/streams?user_id=XXX type
        if (req.get('link').indexOf(this.streamUrl) === -1) 
            return
        if (!(req.body.data != undefined && req.body.data.length >= 1))
            return
        
        console.log('> Twitch: new stream, title: ' + req.body.data[0].title)
    }
}