const express = require('express');
const app = express();
const port = 7777;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;

        await require("./actions/getCommit.js").run(client, body)
    })

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}