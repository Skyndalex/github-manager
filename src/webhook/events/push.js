const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = async (client, { commits, sender, repository, head_commit }) => {
    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                    .setLabel("Send info...")
                .setCustomId("show_commit_modified_files")
                .setStyle("SUCCESS"),
        );

    let commitListMessage = [];

    for (let i in commits) {
        commitListMessage.push(`[\`${commits[i].message}\`](${commits[i].url})`)
    }

    await r.table("commits").insert({
        id: head_commit.id,
        message: head_commit.message,
        url: head_commit.url,
        sender: sender.login,
        senderAvatar: sender.avatar_url,
        repository: repository.full_name,
        modified: head_commit.modified,
        added: head_commit.added,
        removed: head_commit.removed,
    }, { conflict: "update" }).run(client.con);

    let embed = new MessageEmbed()
        .setTitle(`(${repository.full_name}) New commits`)
        .setAuthor({ name: sender.login, iconURL: sender.avatar_url })
        .setDescription(`${commitListMessage.join(",\n")}`)
        .addField(`\`sha\``, `${head_commit.id}`)
        .setColor("GREEN")
        .setURL(head_commit.url)
    await client.channels.cache.get("982001899903533076").send({ embeds: [embed], components: [row] })
}