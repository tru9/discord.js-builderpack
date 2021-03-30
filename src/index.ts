import { Client } from "discord.js";
import * as config from "./config.json"
import { runEvent, setCommands } from "./eventHandler";

const client = new Client();
const commands = new Map();


client.login(config.BOT_TOKEN)
    .catch(console.error);


runEvent(client);
setCommands(commands);

export { commands }