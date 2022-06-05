const { MessageEmbed } = require("discord.js");
exports.run = async (client, body) => {

    const channelID = "982001899903533076";

    let commitListMessage = [];

    for (let i in body.commits) {
        commitListMessage.push(`[${body.commits[i].message}](${body.commits[i].url})`)
    }

    let embed = new MessageEmbed()
        .setAuthor({ name: body.sender.login, iconURL: body.sender.avatar_url })
        .setDescription(`Ref: ${body.ref}\nRepository: ${body.repository.full_name}\n\nCommits:\n${commitListMessage.join(",\n")}`)
        .setColor(`GREEN`)
    if (body.head_commit.modified.length > 0 ) embed.addField("Modified", `\`\`\`ansi\n[1;33;40m${body.head_commit.modified.join(",\n") || "None"}\`\`\``)
    if (body.head_commit.added.length > 0 ) embed.addField("Added", `\`\`\`ansi\n[1;32;40m${body.head_commit.added.join(",\n") || "None"}\`\`\``)
    if (body.head_commit.removed.length > 0 ) embed.addField("Removed", `\`\`\`ansi\n[1;31;40m${body.head_commit.removed.join(",\n") || "None"}\`\`\``)
    await client.channels.cache.get(channelID).send({ embeds: [embed] })
}