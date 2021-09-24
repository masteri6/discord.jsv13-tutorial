const Discord = require('discord.js');
const { Message, MessageButton, MessageActionRow, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'buttons',
    descriptopn: "buttons",
    execute(message) {
        const ButtonEmbed = new MessageEmbed()
        .setTitle("Buttons")
        .setColor("RED")
        .setFooter("buttons")

        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("primary")
            .setLabel("Primary")
            .setStyle("PRIMARY"),
            new MessageButton()
            .setCustomId("secondary")
            .setLabel("Secondary")
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("danger")
            .setLabel("Danger")
            .setStyle("DANGER"),
            new MessageButton()
            .setCustomId("success")
            .setLabel("Success")
            .setStyle("SUCCESS"),
            new MessageButton()
            .setLabel("Link")
            .setURL("https://www.youtube.com/channel/UC5wirKOkchaT3LmAjcTiKTw")
            .setStyle("LINK")
        )

        message.channel.send({ embeds: [ButtonEmbed], components: [row]})
    }
}