const { Client } = require('discord.js')
const client = new Client()

const { token } = require('./token.json')

const markov = require('./app/markov')

client
    .on('ready', () => console.log("Logged in!"))
    .on('message', message)
    .on('guildCreate', guildCreate)

function message(message) {
    const user = message.author.id
    const channel = message.channel.id
    const guild = message.guild.id

    markov.addToChain(message.content, user, channel, guild)
}

function guildCreate(guild) {

}

client.login(token)
