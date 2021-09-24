const Discord = require("discord.js");
const Math = require("mathjs")

module.exports = {
    name: 'gayrate',
    descriptopn: "gayrate command",
    execute(message) {
        // randomgenerator = rg
        const gayraterg = Math.floor(Math.random() * 100) + 0;
        const gayrateEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> is ${gayraterg}% GAY `)
        .setColor('#ff0000')

        message.channel.send({ embeds: [gayrateEmbed] })
    }
}