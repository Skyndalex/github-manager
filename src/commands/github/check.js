module.exports = {
    name: "check",
    description: "Check repositories data from github.com/Skyndalex... And more!",
    options: [
        { name: "option", description: "Choose payload", type: 3, required: true, choices: [
                { name: "stars", value: "star_list" },
                { name: "releases", value: "releases_list" },
                { name: "more soon", value: "unused_value" }
            ]}
    ],
    run: async (client, interaction) => {
        interaction.reply(`Ping: ${client.ws.ping}`);
    }
}