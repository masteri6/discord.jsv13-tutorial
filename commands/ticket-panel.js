const Discord = require('discord.js');
const { Message, MessageButton, MessageActionRow, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'ticket-panel',
    descriptopn: "ticket panel",
    execute(message) {
        const ticketEmbed = new MessageEmbed()
        .setTitle("Ticket")
        .setDescription(
        "> Click on the reaction that relates to your need\n" +

        "> Once the ticket is made you will be able to type in there")

        const row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('ticket')
            .setLabel('🎫 Create Ticket!')
            .setStyle('PRIMARY'),
        )

        message.channel.send({ embeds: [ticketEmbed], components: [row]})
    }
}