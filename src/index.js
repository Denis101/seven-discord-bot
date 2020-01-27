#!/usr/bin/env node
const Discord = require('discord.js');

const { Pool } = require('pg');

const { userIsReferenced } = require('./userUtils.js');
const { ready, discordClient, dbClient, message } = require('./selectors');
const { setReady, setDiscordClient, setDbClient, setMessage } = require('./actions');
const { parse } = require('./commandParser.js');

setDiscordClient(new Discord.Client());

discordClient().on('ready', async () => {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });

    setDbClient(await pool.connect());

    setReady();
    console.log('Bleep bloop, we are online.');
});

discordClient().on('message', msg => {
    if (!ready()) {
        msg.channel.send('I\'m not ready to receive your commands yet. Please wait a sec.');
        return;
    }

    if (msg.author.id === discordClient().user.id 
        || !userIsReferenced(msg, discordClient().user.id)) {
        return;
    }

    setMessage(msg);
    parse(msg.content).execute();
});

discordClient().login(process.env.DISCORD_TOKEN);

const exitHandler = () => {
    dbClient() && dbClient().release();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));

process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

process.on('unhandledRejection', e => {
    message() && message().channel.send(e);
    console.error(e);
    exitHandler.bind(null, {exit:true});
});