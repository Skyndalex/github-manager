const {Modal, TextInputComponent, MessageActionRow} = require("discord.js");
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

            let actionRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId("show_commit_info_back")
                        .setStyle("SUCCESS")
                        .setLabel("Back")
                );

            const filter = (interaction) => interaction.customId === "commit_id_modal";
            await interaction.awaitModalSubmit({ filter, time: 15_000 }).then(async interaction => {
                let query = interaction.fields.getTextInputValue("commit_id_component")

                let data = await r.table("commits").get(query).run(client.con)

                let embed = new MessageEmbed()
                    .setTitle(`Commit "\`${data.message}\`"`)
                if (data.added) embed.addField(`Added files`, String(data.added.join(",\n") || "None"))
                if (data.removed) embed.addField(`Removed files`, String(data.removed.join(",\n") || "None"))
                if (data.modified) embed.addField(`Modified files`, String(data.modified.join(",\n") || "None"))
                    .setColor("BLUE")
                return interaction.update({ embeds: [embed], components: [actionRow] })
            })
            break;
    }
};