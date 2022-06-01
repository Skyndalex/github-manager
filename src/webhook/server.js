const express = require('express');
const app = express();
const port = 7777;
const { MessageEmbed } = require("discord.js");

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;
        console.log(body)

        await require("./newCommit").run(client, body)

    })

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}