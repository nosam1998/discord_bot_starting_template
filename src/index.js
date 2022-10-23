require('dotenv').config();
const { connect } = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];


const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}


client.handleEvents();
client.handleCommands();
client.login(process.env.prodToken || process.env.devToken);

const uri = process.env.mongo_connStr || `mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@${process.env.mongo_host}/${process.env.mongo_dbname}?retryWrites=true&w=majority`;
const mongo_client = new connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
    await connect(uri).catch(console.error);
})();
