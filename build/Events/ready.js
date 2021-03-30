"use strict";
module.exports = {
    type: "on",
    eventName: "ready",
    execute: function (client) {
        var _a;
        console.log(new Date().toLocaleTimeString() + " - " + ((_a = client.user) === null || _a === void 0 ? void 0 : _a.username) + " is online!");
    }
};
