const { MessageEmbed } = require("discord.js");
module.exports = (client, interaction) => {
    const cmd = client.slashCommands.get(interaction.commandName);
    interaction.member = interaction.guild.members.cache.get(interaction.user.id);

    if (cmd) cmd.run(client, interaction).catch(error => {
        let errorEmbedChannel = new MessageEmbed()
            .setDescription(`Server ID: ${interaction.guild.id} (${interaction.guild.name})\nCommand name: ${interaction.commandName}\nError:\n\`\`\`${error || "None"}\`\`\``)
            .setColor("DARK_BUT_NOT_BLACK")
            .setTimestamp()
        if (error) client.channels.cache.get("944744040144969749").send({embeds: [errorEmbedChannel]})

        let errorEmbed = new MessageEmbed()
            .setDescription(`An error has occurred!\nCommand name: ${interaction.commandName}\n\nView [Documentation](https://docs.krivebot.xyz)\nOr [Required bot permissions](https://docs.krivebot.xyz/permissions)\nError:\n\`\`\`${error || "None."}\`\`\`\n\n[Contact with the bot administration](https://krivebot.xyz/discord)\n[Statuspage](https://status.krivebot.xyz)`)
            .setColor("DARK_BUT_NOT_BLACK")
            .setTimestamp()
        interaction.reply({embeds: [errorEmbed]})
    });

}