#!/usr/bin/env node
const Discord = require('discord.js');

const { Pool } = require('pg');

const { userIsReferenced } = require('./utils/userUtils.js');
const { createErrorEmbed } = require('./utils/messageUtils.js');
const { ready, discordClient, dbClient, channel } = require('./selectors');
const { init, initComplete, setDiscordClient, setDbClient, setMessage } = require('./actions');
const { parse } = require('./commandParser.js');
const { observeStore } = require('./store');

const HELP_DATA = {
    title: '@Laty <command>',
    description: 'I am the ultimate raid management tool',
    fields: [
        {
            title: '**Available Commands**',
            description: '---',
            inline: false,
        },
        {
            title: '__raid__',
            description: 'Manage your raids.\nView help for this command with `@Laty raid help`',
            inline: true
        },
        {
            title: '__team__',
            description: 'Manage your raid teams.\nView help for this command with `@Laty team help`',
            inline: true
        },
    ],
};

setDiscordClient(new Discord.Client());

discordClient().on('ready', async () => {
    console.log('Booting Laty...');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });

    setDbClient(await pool.connect());
    init();
});

discordClient().on('message', msg => {
    if (msg.author.id === discordClient().user.id 
        || !userIsReferenced(msg, discordClient().user.id)) {
        return;
    }
    
    if (!ready()) {
        msg.channel.send('I\'m not ready to receive your commands yet. Please wait a sec.');
        return;
    }

    console.log(`Received command [${msg.content}] from [${msg.author.username}]`);
    setMessage(msg);
    parse(msg.content, HELP_DATA).execute();
});

discordClient().login(process.env.DISCORD_TOKEN);

const exitHandler = () => {
    dbClient() && dbClient().release();
};

const errorHandler = e => {
    channel() && channel().send(createErrorEmbed(e));

    console.error(e);
    exitHandler.bind(null, { exit: true });
};


observeStore(state => state.error, error => error && errorHandler(error));

let unsub = null;
unsub = observeStore(state => state.boot, boot => {
    if (boot.initializing && Object.values(boot.reducers).reduce((a, b) => a && b, true)) {
        console.log('Boot sequence complete.');
        console.log('Listening for commands...');
        initComplete();

        unsub && unsub();
    }
});

process.on('exit', exitHandler.bind(null, { cleanup:true }));
process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);