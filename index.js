#!/usr/bin/env node
const Discord = require('discord.js');

const { userIsReferenced } = require('./userUtils.js');
const { ready, client, message } = require('./selectors');
const { setReady, setClient, setMessage } = require('./actions');
const { parse } = require('./commandParser.js');

process.on('unhandledRejection', e => {
    message() && message().channel.send(e);
    console.error(e);
    
});

setClient(new Discord.Client());

client().on('ready', () => {
    setReady();
    console.log('Bleep bloop, we are online.');

    // todo, open redis, retrieve state
});

client().on('message', msg => {
    if (!ready()) {
        msg.channel.send('I\'m not ready to receive your commands yet. Please wait a sec.');
        return;
    }

    if (msg.author.id === client().user.id 
        || !userIsReferenced(msg, client().user.id)) {
        return;
    }

    setMessage(msg);
    parse(msg.content).execute();

    // todo, store state as redis key
});

client().login(process.env.DISCORD_TOKEN);