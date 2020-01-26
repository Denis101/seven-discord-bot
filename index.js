#!/usr/bin/env node
const fs = require('fs');
const Discord = require('discord.js');
const State = require('./state.js');

process.on('unhandledRejection', console.error);

State.setClient(new Discord.Client());

const getUserRef = id => {
    return '<@!' + id + '>';
}

const userIsReferenced = (message, id) => {
    return message.content.includes(getUserRef(id));
}

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
State.getClient().on('ready', () => {
    console.log('Bleep bloop, we are online.');
});

// Create an event listener for messages
State.getClient().on('message', message => {
    const client = State.getClient();
    if (message.author.id === client.user.id || !userIsReferenced(message, client.user.id)) {
        return;
    }

    State.setMessage(message);
    const args = message.content.trim().split(' ');
    args.shift();
    const cmdFile = process.cwd() + '/cmds/' + args[0] + '.js';
    if (!fs.existsSync(cmdFile)) {
        console.log('Failed to execute cmd', cmdFile, args);
        message.channel.send('Sorry, I didn\'t quite catch that. Please try again with something that makes sense.');
        return;
    }

    args.shift();
    require(cmdFile)(args);
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
State.getClient().login(process.env.DISCORD_TOKEN);