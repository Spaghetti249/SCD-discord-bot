const { SlashCommandBuilder, GuildChannel, ChannelType, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('infraction-notice')
        .setDescription('Send a infraction notice to a specific channel.')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('channel')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addUserOption(option =>
            option.setName('target')
                .setDescription('the user id to ping the user who is getting the infraction.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('regulation')
                .setDescription('what regulation the user broke')
                .setMaxLength(2023)
                .setRequired(true))               
        .addStringOption(option =>
            option.setName('punishment')
                .setDescription('the punishment the user is getting')
                .setMaxLength(2023)
                .setRequired(true))  
        .setDefaultMemberPermissions(0x0000000000002000)
        .setDMPermission(false),

    async execute(interaction) {
        const user = interaction.options.getUser('target');
        const channel = interaction.options.getChannel('channel');
        const regulation = interaction.options.getString('regulation');
        const punishment = interaction.options.getString('punishment')
        const member = interaction.options.getMember('target');
        const ran =  Math.floor(Math.random() * 18446744073709551616);
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x6a24ff)
            .setTitle('**__PUNISHMENT ISSUED__**')
            .setDescription(`**Regulation Violated:** ${regulation} \n**Punishment Given:** ${punishment} \n \n`)
            .setTimestamp()
            .setFooter({ text: '- ScD Command \n "Scientia Vincere Tenebras"', iconURL: 'https://cdn.discordapp.com/icons/1060667374459682826/d6b06831d87cae2b7e6eff7f52978008.png' });
        channel.send(`${user}`)
        channel.send({ embeds: [exampleEmbed] });
        interaction.reply({ content: 'Infraction notice has been send.', ephemeral: true });



    },
};
