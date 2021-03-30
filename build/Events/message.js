"use strict";
var index_1 = require("../index");
var eventHandler_1 = require("../eventHandler");
module.exports = {
    type: "on",
    eventName: "message",
    execute: function (client, message) {
        var _a;
        if (message.author.bot)
            return;
        var args = message.content.slice('!'.length).split(" ");
        if (!index_1.commands.has(args[0]))
            return;
        if (eventHandler_1.cooldown.has(message.author.id))
            return message.channel.send('Slow your roll, You\'re on cooldown.').then(function (msg) {
                msg.delete({ timeout: 3000 }).catch();
                message.delete({ timeout: 3000 }).catch(function (e) { return message.channel.send(e).catch(); });
            }).catch(function (e) { return message.channel.send(e).catch(); });
        try {
            index_1.commands.get(args[0]).execute(client, message, args);
            return eventHandler_1.setCooldown(message.author, (_a = index_1.commands.get(args[0])) === null || _a === void 0 ? void 0 : _a.cooldown);
        }
        catch (error) {
            return message.channel.send("Huh, I encountered an error while trying to execute the command!```" + error + "```").catch(function (e) { return message.channel.send(e).catch(); });
        }
    }
};
