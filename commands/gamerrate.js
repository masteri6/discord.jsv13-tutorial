const Discord = require("discord.js");
const Math = require("mathjs")

module.exports = {
    name: 'gamerrate',
    descriptopn: "gamerrate command",
    execute(message) {
        // randomgenerator = rg
        const gamerraterg = Math.floor(Math.random() * 100) + 0;
        const gamerrateEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> is ${gamerraterg}% Gamer🎮`)
        .setColor('#ff0000')

        message.channel.send({ embeds: [gamerrateEmbed] })
    }
}