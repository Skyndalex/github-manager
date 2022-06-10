const { MessageEmbed, MessageActionRow, MessageButton, Message} = require("discord.js");
module.exports = async (client, { action, sender, repository, release }) => {
    console.log(release)

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("show_release_details")
                .setLabel("Details")
                .setStyle("SUCCESS")
        );

    let embed = new MessageEmbed()
        .setTitle(`(${repository.full_name}) New release`)
        .addField(`Title`, String(release.name))
        .addField(`Body`, String(release.body))
        .setColor("BLURPLE")
    client.channels.cache.get("982001899903533076").send({ embeds: [embed], components: [row]})
}