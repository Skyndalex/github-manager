const express = require('express');
const app = express();
const port = 7777;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

module.exports = (client) => {
    app.post('/payload2', async (req, res) => {
        const { body } = req;
        console.log(body);

      //  if (body.release !== body.commits) return require("./actions/getCommit.js").run(client, body)
      //  if (body.release) return require("./actions/getRelease.js").run(client, body)
    })

    app.listen(port, () => console.log(`App listening at http://localhost:${ port }`))
}