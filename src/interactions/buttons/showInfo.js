const {Modal, TextInputComponent, MessageActionRow, MessageButton, MessageEmbed} = require("discord.js");
const { fetch } = require("undici");

module.exports= async (client, interaction) => {
    switch (interaction.customId) {
        case "issue_show_info":
            let fieldList = interaction.message.embeds[0];
            let issueNumber = fieldList.fields[2].value;
            console.log(issueNumber)
            break;
    }
};