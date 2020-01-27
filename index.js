#!/usr/bin/env node
const Discord = require('discord.js');

const { userIsReferenced } = require('./userUtils.js');
const { client, message } = require('./selectors');
const { setClient, setMessage } = require('./actions');
const { parse } = require('./commandParser.js');

process.on('unhandledRejection', e => {
    message() && message().channel.send(e);
    console.error(e);
    
});

setClient(new Discord.Client());

client().on('ready', () => {
    console.log('Bleep bloop, we are online.');
});

client().on('message', message => {
    if (message.author.id === client().user.id 
        || !userIsReferenced(message, client().user.id)) {
        return;
    }

    setMessage(message);
    parse(message.content);
});

client().login(process.env.DISCORD_TOKEN);