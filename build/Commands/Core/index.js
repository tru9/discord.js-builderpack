"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    command: "",
    description: "",
    aliases: [],
    cooldown: 7000,
    execute: function (_client, message, args) {
        message.channel.send('You sent' + (" " + args));
    }
};
