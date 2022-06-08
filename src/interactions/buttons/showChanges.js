const {Modal, TextInputComponent, MessageActionRow, MessageButton} = require("discord.js");
const { fetch } = require("undici");

module.exports = async (client, interaction) => {
    const { MessageEmbed, Modal, MessageActionRow, MessageButton, TextInputComponent } = require("discord.js");

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
            };

            let embed = new MessageEmbed()
                .setTitle(`\`${commit.commit.message}\``)
                .addField(`Modified files`, `\`\`\`ansi\n\u001B[0;34m${Cyber.join("\n")}\`\`\``)
                .addField(`Stats`,`\`\`\`ansi\n\u001B[0;35mAdditions: ${commit.stats.additions}\nDeletions: ${commit.stats.deletions}\nTotal: ${commit.stats.total}\`\`\``)
                .setColor("ORANGE")
            return interaction.reply({ embeds: [embed], ephemeral: true })
            break;
    }
};