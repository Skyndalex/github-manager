const express = require('express');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");

exports.run = async (client, body) => {
        const { commits, head_commit, repository } = body;
        console.log(body);

        const channelID = "963878263825006632";

        let commitListMessage = [];

        for (let i in commits) {
            commitListMessage.push(`[**\`${commits[i].message}\`**](${commits[i].url})`)
        }

        let embed = new MessageEmbed()
            .setAuthor({ name: body.sender.login, iconURL: body.sender.avatar_url })
            .setDescription(`Ref: ${body.ref}\nRepository: ${repository.full_name}\n\nCommits:\n${commitListMessage.join(",\n")}`)
            .setColor(`GREEN`)
        if (head_commit.modified.length > 0 ) embed.addField("Modified", `\`\`\`ansi\n[1;33;40m${head_commit.modified.join(",\n") || "None"}\`\`\``)
        if (head_commit.added.length > 0 ) embed.addField("Added", `\`\`\`ansi\n[1;32;40m${head_commit.added.join(",\n") || "None"}\`\`\``)
        if (head_commit.removed.length > 0 ) embed.addField("Removed", `\`\`\`ansi\n[1;31;40m${head_commit.removed.join(",\n") || "None"}\`\`\``)
        await client.channels.cache.get(channelID).send({ embeds: [embed] })

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}