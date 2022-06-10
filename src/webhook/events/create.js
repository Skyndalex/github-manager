const { MessageEmbed, MessageActionRow, MessageButton, Message} = require("discord.js");
module.exports = async (client, { action, sender, repository, ref }) => {
    console.log(action)

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("show_tag_details")
                .setLabel("Details")
                .setStyle("SUCCESS")
        );

    let embed = new MessageEmbed()
        .setTitle(`(${repository.full_name}) New tag: ${ref}`)
        .setColor("BLURPLE")
    client.channels.cache.get("982001899903533076").send({ embeds: [embed], components: [row]})

}