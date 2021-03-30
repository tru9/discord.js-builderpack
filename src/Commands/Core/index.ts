import { Client, Message } from "discord.js"
import { CommandConfig } from "../../eventHandler"

export const config: CommandConfig = {
    command: "",
    description: "",
    aliases: [],
    cooldown: 7000,
    execute(_client: Client, message: Message, args: string[]) {
        message.channel.send('You sent' + ` ${args}`)
    }
}