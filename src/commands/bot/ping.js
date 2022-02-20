module.exports = {
    name: "ping",
    description: "Bot ping",

    run: async (client, interaction) => {
        interaction.reply(`Ping: ${client.ws.ping}`);
    }
} //test