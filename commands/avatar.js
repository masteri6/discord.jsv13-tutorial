const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    descriptopn: "avatar command",
    execute(message) {
        let memberavatar = message.mentions.users.first() || message.author
        let avatar = memberavatar.displayAvatarURL({size: 02000})
        const avatarembed = new Discord.MessageEmbed()
        .setTitle(`${memberavatar.username} avatar`)
        .setImage(avatar)
        .setColor('#ff0000')
        message.channel.send({ embeds: [avatarembed] })
    }
}