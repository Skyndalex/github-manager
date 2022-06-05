const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = async (client, { commits, sender, repository, head_commit }) => {
    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("Show modified files")
                .setCustomId("show_commit_modified_files")
                .setStyle("PRIMARY")
        );

    let commitListMessage = [];

    for (let i in commits) {
        commitListMessage.push(`[${commits[i].message}](${commits[i].url})`)
    }

    let embed = new MessageEmbed()
        .setTitle(`(${repository.full_name}) New commits`)
        .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
        .setDescription(commitListMessage.join(",\n"))
        .setColor("GREEN")
        .setURL(head_commit.url)
    await client.channels.cache.get("982001899903533076").send({ embeds: [embed], components: [row] })
}