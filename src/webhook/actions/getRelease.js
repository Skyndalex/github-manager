const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
exports.run = async (client, body) => {
    const channelID = "982001899903533076";

    const messageActionRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("Show info")
                .setStyle("SUCCESS")
                .setCustomId("release_show_full_info"),
            new MessageButton()
                .setLabel("Back")
                .setStyle("SECONDARY")
                .setCustomId("release_delete_info")
        )

    let embed = new MessageEmbed()
        .setTitle(`(${body.repository.full_name}) New release published #${body.release.name}`)
        .setURL(body.release.html_url)
        .setColor("GREEN")
    if (body.release.name) return client.channels.cache.get(channelID).send({ embeds: [embed], components: [messageActionRow] })

    let embedTag = new MessageEmbed()
        .setTitle(`(${body.repository.full_name}) Tag created #${body.ref}`)
        .setColor("ORANGE")
    if (body.ref_type === "tag") return client.channels.cache.get(channelID).send({ embeds: [embedTag] })
}