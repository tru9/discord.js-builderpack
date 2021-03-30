import { Client, User } from "discord.js";
import { readdirSync } from "fs";

const cooldown = new Map();

interface EventConfig {
    type: "on" | "once";
    eventName: string;
    execute: Function;
}

export interface CommandConfig {
    command: string,
    description: string;
    aliases: string[];
    cooldown?: number;
    execute: Function;
}


export async function runEvent(client: Client) {
    const events = readdirSync('./src/Events');

    for (const file of events) {
        const event: EventConfig = await import(`./Events/${file.slice(0, -3)}`)
        client[event.type](event.eventName, (...args: any) => event.execute(client, ...args));
    }
}

export async function setCommands(Commands: Map<string, CommandConfig>) {
    const commands = readdirSync("./src/Commands");
    for (const fileCategories of commands) {
        const files = readdirSync(`./src/Commands/${fileCategories}`);
        files.forEach(async file => {
            let path = await import(`./Commands/${fileCategories}/${file.slice(0, -3)}`);
            Commands.set(file.split(".ts")[0], path.config);
            path.config.aliases.forEach((alias: string) => Commands.set(alias, path.config));
        })
    }
}

export async function setCooldown(user: User, time: number) {
    if (cooldown.has(user.id)) return;

    cooldown.set(user.id, time)
    setTimeout(() => cooldown.delete(user.id), time);
}

export {
    cooldown
}