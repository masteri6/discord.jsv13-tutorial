const Discord = require("discord.js");

module.exports = {
    name: 'membercount',
    descriptopn: "membercount command",
    execute(message) {
        const membercountEmbed = new Discord.MessageEmbed()
        .setDescription(`🎭 ${message.guild.members.cache.filter(member => !member.user.bot).size} members! | 🤖 ${message.guild.members.cache.filter(member => member.user.bot).size} bots!`)
        .setColor('#ff0000')

        message.channel.send({ embeds: [membercountEmbed] })
    }
}