const { fetch } = require("undici");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = async (client, { action, issue, sender, repository }) => {
    if (action === "opened") console.log(`Issue ${issue.title} (#${issue.number}) opened`);
    if (action === "closed") console.log(`Issue ${issue.title} (#${issue.number}) closed`);
    if (action === "reopened") console.log(`Issue ${issue.title} (#${issue.number}) reopened`);
    if (action === "deleted") console.log(`Issue ${issue.title} (#${issue.number}) deleted`);

    await client.channels.cache.get("973614510621487155").send(`Issue ${issue.title} (#${issue.number}) ${action}`);

    console.log(issue)

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("issue_show_info")
                .setStyle("SUCCESS")
                .setLabel("Show more info")
        );

    if (action === "opened") {
        let embedOpened = new MessageEmbed()
            .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
            .setTitle(`(${repository.full_name}) Issue opened [${issue.number}]`)
            .addField(`Title`, String(issue.title), true)
            .addField(`Description`, String(issue.body), true)
            .addField(`Number`, `#${issue.number}`)
            .setColor("ORANGE")
        await client.channels.cache.get("982001899903533076").send({ embeds: [embedOpened], components: [row] })
    }
};