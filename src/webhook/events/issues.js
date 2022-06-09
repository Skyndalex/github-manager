const { fetch } = require("undici");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = async (client, { action, issue, sender, repository }) => {
    // console.log(issue)

    switch (action) {
        case "opened":
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("issue_show_info")
                        .setStyle("SUCCESS")
                        .setLabel("Show more info")
                );

            let embedOpened = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue opened [${issue.number}]`)
                .addField(`Title`, String(issue.title), true)
                .addField(`Description`, String(issue.body), true)
                .addField(`Number`, `${issue.number}`)
                .setURL(issue.html_url)
                .setColor("ORANGE")
            await client.channels.cache.get("982001899903533076").send({ embeds: [embedOpened], components: [row] })
            break;
        case "closed":
            let embedClosed = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue closed #${issue.title}`)
                .setColor("RED")
                .setURL(issue.html_url)
            await client.channels.cache.get("982001899903533076").send({ embeds: [embedClosed] })
            break;
        case "reopened":
            let embedReopened = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue reopened #${issue.title}`)
                .setURL(issue.html_url)
                .setColor("DARK_VIVID_PINK")
            await client.channels.cache.get("982001899903533076").send({ embeds: [embedReopened] })
            break;
        case "deleted":
            let embedDeleted = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue deleted #${issue.title}`)
                .setColor("RED")
            await client.channels.cache.get("982001899903533076").send({ embeds: [embedDeleted] })
            break;
    }
};