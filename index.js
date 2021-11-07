const Discord = require('discord.js')
const { Intents } = require('discord.js');
const fs = require('fs')

// BOT
const bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
bot.commands = new Discord.Collection();
// BOT - settings
const prefix = '!'
const token = 'ODM0MDgxNzYzODM5MTgwODAw.YH7tLA.zJuXC7dwafrc5z6BBzwqwc-b8TE'
// BOT - login
bot.login(token)
// BOT - ready message
bot.on('ready', () => {
    console.log(`${bot.user.tag} Activate!`)
    bot.user.setActivity(`${prefix}help`, { type: "WATCHING"})
    bot.user.setStatus("dnd")
})

// Commands folder
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}
// ------------------------------------------------------------------------------
bot.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        bot.commands.get('ping').execute(message);
    } else if(command === 'avatar'){
        bot.commands.get('avatar').execute(message);
    } else if(command === 'gamerrate'){
        bot.commands.get('gamerrate').execute(message);
    } else if(command === 'membercount'){
        bot.commands.get('membercount').execute(message);
    } else if(command === 'stupidrate'){
        bot.commands.get('stupidrate').execute(message);
    } else if(command === 'gayrate'){
        bot.commands.get('gayrate').execute(message);
    } else if(command === 'buttons'){
        bot.commands.get('buttons').execute(message);
    } else if(command === 'ticket-panel'){
        bot.commands.get('ticket-panel').execute(message);
    }
})

// Commands
bot.on('messageCreate', message =>{
    const args = message.content.slice(prefix.length).split(/ +/);
    if (message.content === `${prefix}botinfo` || message.content === `${prefix}bi`) {
        let botinfoEmbed = new Discord.MessageEmbed()
        .setTitle("🤖BOT🤖")
        .setDescription("Info of BOT")
        .addFields(
            { name: 'Prefix', value: `${prefix}`, inline: true},
            { name: 'BOT tag', value: `${bot.user.tag}`, inline: true},
            { name: 'Owner', value: `Mastericek#6969`},
        )
        .setColor('#ff0000')
        message.channel.send({ embeds: [botinfoEmbed] });
    }
    else if (message.content === `${prefix}help` || message.content === `${prefix}h`) {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle('HELP')
        .addFields(
            { name: 'Prefix', value: `${prefix}`},
            { name: 'Fun', value: `${prefix}help fun`},
            { name: 'Utility', value: `${prefix}help utility`},
            { name: 'Bot', value: `${prefix}help bot`},
        )
        .setColor('#ff0000')
        message.channel.send({ embeds: [helpEmbed] });
    }
    else if (message.content === `${prefix}help fun` || message.content === `${prefix}hf`) {
        let helpfunEmbed = new Discord.MessageEmbed()
        .setTitle('Fun commnads')
        .addFields(
            { name: '!gamerrate', value: `Gamer rate`},
            { name: '!stupidrate', value: `Stupid rate`},
            { name: '!gayrate', value: `Gay rate`},
        )
        .setColor('#ff0000')
        message.channel.send({ embeds: [helpfunEmbed] });
    }
    else if (message.content === `${prefix}help utility` || message.content === `${prefix}hu`) {
        let helputilityEmbed = new Discord.MessageEmbed()
        .setTitle('Utility commnads')
        .addFields(
            { name: '!membercount', value: `Member count`},
            { name: '!avatar', value: `Show avatar`},
            { name: '!ping', value: `Show ping`},
        )
        .setColor('#ff0000')
        message.channel.send({ embeds: [helputilityEmbed] });
    }
    else if (message.content === `${prefix}help bot` || message.content === `${prefix}hb`) {
        let helpbotEmbed = new Discord.MessageEmbed()
        .setTitle('BOO commnads')
        .addFields(
            { name: '!support', value: `<URL>`},
            { name: '!invite', value: `<URL>`},
            { name: '!vote', value: `<URL>`},
        )
        .setColor('#ff0000')
        message.channel.send({ embeds: [helpbotEmbed] });
    }
    else if(message.content.startsWith("m!setactivity")) {
        let type = args[1];
        let text = args.slice(2).join("")
        if(message.author.id === "742453301504901121") {
            try {
                bot.user.setActivity(`${text}`, { type: `${type}` });
                } catch(e) {
                    message.channel.send(`ERROR: \`${e.message}\``).then(message =>{
                        message.react('🔴');
                    })
            }
        } else {
            message.channel.send("No perms")
        }
    }
    else if(message.content.startsWith("m!setstatus")) {
        let status = args[1]
        if(message.author.id === "742453301504901121") {
            try {
                bot.user.setStatus(status);
                } catch(e) {
                    message.channel.send(`ERROR: \`${e.message}\``).then(message =>{
                        message.react('🔴');
                    })
            }
        } else {
            message.channel.send("No perms")
        }
    }
})

// MemmberADD
bot.on("guildMemberAdd", guildmember =>{
    const welcomeembed = new Discord.MessageEmbed()
    .setColor('#00ff5f')
    .setDescription(`🎉<@${guildmember.id}> Welcome!`)
    .setThumbnail(guildmember.user.displayAvatarURL({dynamic: true}))
    guildmember.guild.channels.cache.get('862254842700365864').send({ embeds: [welcomeembed] })
})

const { Message, MessageButton, MessageActionRow, MessageEmbed} = require('discord.js')

bot.on('interactionCreate', async (interaction) => {
    await interaction.deferUpdate();
    if (interaction.isButton()) {
        if (interaction.customId === 'ticket') {

            const thread = await interaction.channel.threads.create({
                name: `${interaction.user.tag}`,
                autoArchiveDuration: 1440, // this is 24hrs 60 will make it 1 hr
                //type: 'private_thread', // for private tickets u need server boosted to lvl 1 or 2 ok u need lvl 2, since mine is not boosted i will remove this LINE ONLY!
            });
            await thread.setLocked(true)
            const embed = new MessageEmbed()
                .setTitle('Ticket 🎫')
                .setDescription('Hello there, \n The staff will be here as soon as possible mean while tell us about your issue!\nThank You!')
                .setColor('#ED4245')
                .setTimestamp()

            const del = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('delticket')
                    .setLabel('🗑️ Delete Ticket!')
                    .setStyle('DANGER'),
                );
            interaction.user.send('Your ticket has been opened!');
            thread.send({
                content: `Welcome <@${interaction.user.id}> \`|\` <@&902855333167382528>`,
                embeds: [embed],
                components: [del]
            }).then(interaction.followUp({
                content: 'Created Ticket!',
                ephemeral: true
            }))
            console.log(`Created thread: ${thread.name}`);
            setTimeout(() => {
                interaction.channel.bulkDelete(1)
            }, 5000)
        } else if (interaction.customId === 'delticket') {

            const thread = interaction.channel
            thread.delete();

        }
    }
})
