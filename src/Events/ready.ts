import { Client } from "discord.js"

export = {
    type: "on",
    eventName: "ready",
    execute(client: Client) {
        console.log(`${new Date().toLocaleTimeString()} - ${client.user?.username} is online!`)
    }
}