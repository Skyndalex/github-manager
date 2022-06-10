const { Modal, TextInputComponent, MessageActionRow, MessageButton, MessageEmbed, MessageAttachment} = require("discord.js");
const { fetch } = require("undici");

module.exports = async (client, interaction) => {
    switch (interaction.customId) {
        case "show_commit_modified_files":
            let fieldList = interaction.message.embeds[0];
            let commitID = fieldList.fields[0].value;

            const res = await fetch(`https://api.github.com/repos/skyndalex/github-manager/commits/${commitID}`)
            const commit = await res.json()
            console.log(commit.files)

            let statusStrings = {
                modified: "Modified",
                added: "Added",
                removed: "Removed"
            };

            let Cyber = []
            for (let i in commit.files) {
                Cyber.push(`${commit.files[i].filename} [${statusStrings[commit.files[i].status]}] `)
            }

            const row2 = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("commit_show_code")
                        .setLabel("Show code")
                        .setStyle("SECONDARY")
                )
            let embed = new MessageEmbed()
                .setTitle(`\`${commit.commit.message}\``)
                .addField(`Modified files`, `\`\`\`ansi\n\u001B[0;34m${Cyber.join("\n")}\`\`\``)
                .addField(`Stats`,`\`\`\`ansi\n\u001B[0;35mAdditions: ${commit.stats.additions}\nDeletions: ${commit.stats.deletions}\nTotal: ${commit.stats.total}\`\`\``)
                .addField(`Commit sha`, `${commit.sha}`)
                .setColor("ORANGE")
            return interaction.reply({ embeds: [embed], ephemeral: true, components: [row2] })
            break;
        case "commit_show_code":
            let embedValues = interaction.message.embeds[0];
            let commitSHA = embedValues.fields[2].value;

            const res2 = await fetch(`https://api.github.com/repos/skyndalex/github-manager/commits/${commitSHA}`)
            const json = await res2.json()

            let str = []
            for (let i in json.files) {
                str.push(`${json.files[i].filename}\n\n${json.files[i].patch}`)
            };
          //  console.log(str.toString())

            const file = new MessageAttachment(Buffer.from(str.toString(), 'utf-8'), `${json.commit.message}.diff`)

            return interaction.reply({ files: [file], ephemeral: true })
            break;
    }
};