const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;
        const { commits, head_commit, pusher, pull_request, issue, comment, repository, after, sender } = body;
        console.log(body);

        const channelID = "944344990409183273";

        if (commits) {
            let commitList = [];
            for (let i in commits) {
                commitList.push(commits[i].message)
            };

            let embed = new MessageEmbed()
                .setAuthor({name: sender.login, iconURL: sender.avatar_url})
                .setTitle(`(${repository.full_name}) New commits [${commitList.length}]`)
                .setDescription(`**${commitList.join(",\n")}**`)
                .setFooter({
                    text: "The bot lists the changed files only if their value does not exceed 5.",
                    iconURL: "https://logos-world.net/wp-content/uploads/2020/11/GitHub-Symbol.png"
                })
                .setURL(head_commit.url)
                .setColor(`GREEN`)
            if (head_commit.modified.length < 5) embed.addField(`Modified file(s) [${head_commit.modified.length}]`, `\`${head_commit.modified.join(",\n") || "None"}\``)
            await client.channels.cache.get(channelID).send({embeds: [embed]})
        } else if (comment) {
            let embed3 = new MessageEmbed()
                .setAuthor({name: body.sender.login, iconURL: body.sender.avatar_url})
                .setTitle(`(${repository.full_name}) New comment. Or edit. Or deleted.`)
                .setFooter({
                    text: "Sometimes there can be problems if the user performs a delete/edit/etc action. I also could not add the function name (Pull requests, commits etc)",
                    iconURL: "https://logos-world.net/wp-content/uploads/2020/11/GitHub-Symbol.png"
                })
                .setDescription(`\`${comment.body}\``)
                .setColor(`#cc33ff`)
                .setURL(comment.html_url)
            await client.channels.cache.get(channelID).send({embeds: [embed3]})
        } else if (issue?.state === "open") {
            let embed1 = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${repository.full_name}) Issue opened!`)
                .setDescription(`${issue.body}`)
                .addField(`Title`, `\`${issue.title}\``, true)
                .addField(`Opened issues`, `\`${issue.number}\``, true)
                .setColor(`GREEN`)
            await client.channels.cache.get(channelID).send({ embeds: [embed1] })
        } else if (issue?.state === "closed") {
            let embed2 = new MessageEmbed()
                .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
                .setTitle(`(${body.repository.full_name}) Issue closed: #${issue.title}`)
                .setColor(`RED`)
            await client.channels.cache.get(channelID).send({embeds: [embed2]})
        }
    })
    app.get('/test', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}