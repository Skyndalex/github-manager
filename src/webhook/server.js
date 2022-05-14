const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;
        const { commits, head_commit, pull_request, issue, comment, repository, sender, action, ref, project, organization, release } = body;
        console.log(body);

        const channelID = "963878263825006632";

        if (commits) {
            let commitListMessage = [];
            for (let i in commits) {
                commitListMessage.push(`[**\`${commits[i].message}\`**](${commits[i].url})`)
            }

            let embed = new MessageEmbed()
                .setAuthor({name: body.sender.login, iconURL: body.sender.avatar_url})
                .setDescription(`Ref: ${body.ref}\nRepository: ${repository.full_name}\n\nCommits:\n${commitListMessage.join(",\n")}`)
                .setColor(`GREEN`)
            if (head_commit.modified.length > 0 ) embed.addField("Modified", `\`\`\`ansi\n[1;33;40m${head_commit.modified.join(",\n") || "None"}\`\`\``)
            if (head_commit.added.length > 0 ) embed.addField("Added", `\`\`\`ansi\n[1;32;40m${head_commit.added.join(",\n") || "None"}\`\`\``)
            if (head_commit.removed.length > 0 ) embed.addField("Removed", `\`\`\`ansi\n[1;31;40m${head_commit.removed.join(",\n") || "None"}\`\`\``)
            await client.channels.cache.get(channelID).send({embeds: [embed]})
        } else if (comment) {
            let embed8 = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name} Found comment!`)
                .setDescription(`${comment.body}`)
                .setColor("DARK_BUT_NOT_BLACK")
                .setURL(comment?.html_url)
            await client.channels.cache.get(channelID).send({embeds: [embed8]})
        } else if (issue?.state === "open") {
            let embed1 = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue opened!`)
                .setDescription(`${issue.body}`)
                .addField(`Title`, `\`${issue.title}\` (${action})`, true)
                .addField(`Opened issues`, `\`${issue.number}\``, true)
                .setURL(issue.html_url)
                .setColor(`GREEN`)
            if (action === "reopened") embed1.setColor(`DARK_VIVID_PINK`)
            await client.channels.cache.get(channelID).send({ embeds: [embed1] })
        } else if (issue?.state === "closed") {
            let embed2 = new MessageEmbed()
                .setAuthor({name: sender.login, iconURL: sender.avatar_url})
                .setTitle(`(${body.repository.full_name}) Issue closed: #${issue.title}`)
                .setURL(issue.html_url)
                .setColor(`RED`)
            await client.channels.cache.get(channelID).send({embeds: [embed2]})
        }  else if (project?.state === "open") {
            let embed6 = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Project opened! [#${project.name}]`)
                .setURL(project.html_url)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({embeds: [embed6]})
        } else if (project?.state === "closed") {
            let embed7 = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Project closed [#${project.name}]`)
                .setURL(project.html_url)
                .setColor(`RED`)
            await client.channels.cache.get(channelID).send({embeds: [embed7]})
        }
    })
    app.get('/test', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}