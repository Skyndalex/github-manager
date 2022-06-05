const { fetch } = require("undici");

module.exports = async (client, { action, issue }) => {
    if (action === "opened") console.log(`Issue ${issue.title} (#${issue.number}) opened`);
    if (action === "closed") console.log(`Issue ${issue.title} (#${issue.number}) closed`);
    if (action === "reopened") console.log(`Issue ${issue.title} (#${issue.number}) reopened`);
    if (action === "deleted") console.log(`Issue ${issue.title} (#${issue.number}) deleted`);

    await client.channels.cache.get("973614510621487155").send(`Issue ${issue.title} (#${issue.number}) ${action}`);
};