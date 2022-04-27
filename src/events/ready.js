module.exports = client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.guilds.cache.get("943884836169482260").commands.set(arrayOfSlashCommands)

    client.user.setActivity('T E S T Y  N A  P R O D U K C J I', {
        status: "dnd",
        game: {
            name: "github.com/Skyndalex",
            type: "WATCHING"
        }
    });
}