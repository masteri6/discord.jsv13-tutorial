const Discord = require('discord.js')
const { Intents } = require('discord.js');
const fs = require('fs')

// BOT
const bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
bot.commands = new Discord.Collection();
// BOT - settings
const prefix = '!'
const token = ''
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
        if(message.author.id === "<your id>") {
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
        if(message.author.id === "<your id>") {
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
    if(interaction.isButton()) {
        if (interaction.customId === 'primary') {
            interaction.followUp({ content: 'You click on Primary button', ephemeral: true})
        }
    }
})
