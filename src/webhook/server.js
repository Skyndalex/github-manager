const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;
        const { commits, head_commit, pusher, pull_request, issue, repository, after, sender } = body;
        console.log(body);

        const channelID = "943261043415720026";

        if (commits) {
            let commitList = [];
            for (let i in commits) {
                commitList.push(commits[i].message)
            };

            let commit = new MessageEmbed()
                .setAuthor({name: sender.login, iconURL: sender.avatar_url})
                .setTitle(`(${repository.full_name}) New commits [${commitList.length}]`)
                .setDescription(`Changes, full informations: https://github.com/Skyndalex/github-manager/commit/${after}`)
                .addField(`Message(s)`, `\`${commitList.join(",\n")}\``, true)
                .addField(`Modified file(s)`, `\`${head_commit.modified.join(",\n") || "None"}\``, true)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({embeds: [commit]})
        } else if (!issue?.comment) {
            let commentIssueNew = new MessageEmbed()
                .setAuthor({ name: body.sender.login, iconURL: body.sender.avatar_url })
                .setTitle(`(${repository.full_name}) New comment from issue: #${issue.title} [${issue.comments}]`)
                .setDescription(`${issue.comment.body}`)
                .setColor(`#cc33ff`)
                .setURL(issue.comment.html_url)
            await client.channels.cache.get(channelID).send({embeds: [commentIssueNew]})
        } else if (issue?.state === "open") {
            let issueEmbed = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue opened!`)
                .setDescription(`${issue.body}`)
                .addField(`Title`, `\`${issue.title}\``, true)
                .addField(`Opened issues`, `\`${issue.number}\``, true)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({ embeds: [issueEmbed] })
        } else if (issue?.state === "closed") {
            let issueClosed = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${body.repository.full_name}) Issue closed: #${issue.title}`)
                .setColor(`RED`)
            await client.channels.cache.get(channelID).send({embeds: [issueClosed]})
        }
    })
    app.get('/test', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}
