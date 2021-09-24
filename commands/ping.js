const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    descriptopn: "ping command",
    execute(message) {
        message.channel.send("Pinging..").then(msg =>{
            const { member } = message
            var botping = msg.createdTimestamp - message.createdTimestamp;
            const pingembed = new Discord.MessageEmbed()
            .setDescription(`<@${member.id}> \n**Ping:** ${botping}`)
            .setColor('#002eff')
            msg.edit("\u200B");
            msg.edit({ embeds: [pingembed] })
        })
    }
}