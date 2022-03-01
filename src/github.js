const { Client, Intents, Collection } = require("discord.js");
const { readdirSync } = require('fs');
const { token } = require("./config.json");

const client = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ],
    ws: { properties: { $browser: "Discord iOS" }}
});
require("./webhook/server")(client);

client.slashCommands = new Collection()

global.arrayOfSlashCommands = [];


const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.js')[0];
    client.on(eventName, (...args) => event(client, ...args))
}

const commandFolders = readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.slashCommands.set(command.name, command);
        arrayOfSlashCommands.push(command)
    }
}
client.login(token)
// Test from visual studio code