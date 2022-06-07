const {Modal, TextInputComponent, MessageActionRow, MessageButton} = require("discord.js");
const { fetch } = require("undici");

module.exports = async (client, interaction) => {
    const { MessageEmbed, Modal, MessageActionRow, MessageButton, TextInputComponent } = require("discord.js");

    switch (interaction.customId) {
        case "show_commit_modified_files":
            let modal = new Modal()
                .setTitle("Commit ID")
                .setCustomId("commit_id_modal")

            let modalIdComponent = new TextInputComponent()
                .setStyle("SHORT")
                .setRequired(true)
                .setPlaceholder("Commit ID")
                .setMaxLength(100)
                .setCustomId("commit_id_component")
                .setLabel("Commit ID")

            const modalRow = new MessageActionRow().addComponents(modalIdComponent)

            modal.addComponents(modalRow)
            await interaction.showModal(modal)

            const filter = (interaction) => interaction.customId === "commit_id_modal";
            await interaction.awaitModalSubmit({ filter, time: 15_000 }).then(async interaction => {
                const res = await fetch(`https://api.github.com/repos/skyndalex/github-manager/commits/${interaction.fields.getTextInputValue("commit_id_component")}`)
                const commit = await res.json()
                console.log(commit)

                let embed = new MessageEmbed()
                    .setTitle(`Commit: \`${commit.commit.message}\``)
                    .setDescription(`\`\`\`Additions: ${commit.stats.additions}\nDeletions: ${commit.stats.deletions}\nTotal: ${commit.stats.total}\`\`\``)
                    .addField(`Status`, String(commit.files.status))
                    .setColor("DARK_BUT_NOT_BLACK")
                return interaction.reply({ embeds: [embed], ephemeral: true })
            })
            break;
    }
};