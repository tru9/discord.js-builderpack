import { Client, Message } from "discord.js"
import { commands } from "../index";
import { cooldown, setCooldown } from "../eventHandler";

export = {
    type: "on",
    eventName: "message",
    execute(client: Client, message: Message) {
        if (message.author.bot) return;
        const args = message.content.slice('!'.length).split(" ")
        if (!commands.has(args[0])) return;
        if (cooldown.has(message.author.id)) return message.channel.send('Slow your roll, You\'re on cooldown.').then((msg) => {
            msg.delete({ timeout: 3000 }).catch()
            message.delete({ timeout: 3000 }).catch(e => message.channel.send(e).catch())
        }).catch(e => message.channel.send(e).catch());
        try {
            commands.get(args[0]).execute(client, message, args)
            return setCooldown(message.author, commands.get(args[0])?.cooldown)
        } catch (error) {
            return message.channel.send(`Huh, I encountered an error while trying to execute the command!\`\`\`${error}\`\`\``).catch(e => message.channel.send(e).catch())
        }
    }
}