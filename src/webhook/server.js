const express = require("express");
const bodyParser = require("body-parser");
const { githubSecret } = require("../config.json");
module.exports = (client) => {
    const express = require('express');
    const app = express();
    const crypto = require("crypto");
    const bodyParser = require('body-parser');
    app.use(bodyParser.json());

    app.get("/payload2", (req, res) => res.send("kurwa post"));

    app.post("/payload2", (req, res) => {
        const { body } = req;
        console.log(body)
        const { action, issue, commits, repository, sender, head_commit } = body;

        const event = req.headers["x-github-event"];
        const signature = req.headers["x-hub-signature"];

        // Verify the signature
        const hmac = crypto.createHmac("sha1", githubSecret);
        const calculatedSignature = `sha1=${hmac.update(JSON.stringify(req.body)).digest("hex")}`;

        if (calculatedSignature != signature) return res.sendStatus(401);

        require(`./events/${event}`)(client, body);
        require("../interactions/buttons/showChanges.js")(client, body);

        res.sendStatus(200);
    });

    app.listen(7777, () => console.log(`Kurwa listening at d`));

}