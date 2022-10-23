const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    const { commands, commandArray } = client;
    client.handleCommands = async() => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"));

            
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name} has passed through the handler!`);
            }
        }
        const rest = new REST({ version: "9" }).setToken(process.env.prodToken || process.env.devToken);
        try {
            console.log("Started refreshing application (/) commands.");

            if (process.env.clientId && process.env.guildId) {
                await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), {
                    body: commandArray,
                });
            } else if (process.env.applicationId) {
                await rest.put(Routes.applicationCommands(process.env.applicationId), {
                    body: commandArray,
                });
            } else {
                console.error(`Please make sure to use clientId and guildId OR applicationId! You can change this in the .env file`)                
            }
        } catch (error) {
            console.error(error);
        }
    }
}