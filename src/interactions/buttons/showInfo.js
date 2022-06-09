const {Modal, TextInputComponent, MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const { fetch } = require("undici");

module.exports= async (client, interaction) => {
    switch (interaction.customId) {
        case "issue_show_info":
            let fieldList = interaction.message.embeds[0];
            let issueNumber = fieldList.fields[2].value;
            console.log(issueNumber)

            const res = await fetch(`https://api.github.com/repos/Skyndalex/github-manager/issues/${issueNumber}`)
            const json = await res.json()

            let labels = []

            for (let i in json.labels) {
                labels.push(json.labels[i].name)
            }

            let assignees = []

            for (let i in json.assignees) {
                assignees.push(json.assignees[i].login)
            }

            let embed = new MessageEmbed()
                .setAuthor({ name: "Issue creator: " + json.user.login, iconURL: json.user.avatar_url })
                .setTitle("#" + json.title)
                .setDescription(`${json.body}`)
                .addField(`State`, `${json.state}`)
                .addField(`Assignees`, `${assignees.join(",\n")}`)
                .addField(`Labels`, `\`${labels.join(", ")}\``)
                .setColor("BLURPLE")
            return interaction.reply({ embeds: [embed], ephemeral: true })
            break;
    }
};