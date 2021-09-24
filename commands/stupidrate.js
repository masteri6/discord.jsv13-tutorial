const Discord = require("discord.js");
const Math = require("mathjs")

module.exports = {
    name: 'stupidrate',
    descriptopn: "stupidrate command",
    execute(message) {
        // randomgenerator = rg
        const stupidraterg = Math.floor(Math.random() * 100) + 0;
        const stupidrateEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> is ${stupidraterg}% Stupid`)
        .setColor('#ff0000')

        message.channel.send({ embeds: [stupidrateEmbed] })
    }
}