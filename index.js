const { Client } = require('discord.js')
const client = new Client()

const { token } = require('./token.json')

const markov = require('./app/markov')

const PREFIX = "m?"

client
    .on('ready', () => console.log("Logged in!"))
    .on('message', message)
    .on('guildCreate', guildCreate)

function message(message) {
    if(message.author.bot) {
        return
    }

    if(message.content.startsWith(PREFIX)) {
        handleCommand(message)
    }

    const user = message.author.id
    const channel = message.channel.id
    const guild = message.guild.id

    markov.addToChain(message.content, user, channel, guild)
}

function guildCreate(guild) {

}

function handleCommand(message) {
    const args = message.content.split(" ")
    const command = args.shift().replace(PREFIX, "")

    if(command == "imitate") {
        const id = args[0]
        const sentence = markov.generateSentence(id)
        message.reply(sentence)
    }
}

client.login(token)
