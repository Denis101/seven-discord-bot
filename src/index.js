#!/usr/bin/env node
const Discord = require('discord.js');
const redis = require('redis');
const { Pool } = require('pg');

const { userIsReferenced } = require('./utils/userUtils.js');
const { createErrorEmbed } = require('./utils/messageUtils.js');
const { ready, discordClient, dbClient, guild } = require('./selectors');
const { parse } = require('./services/commandParser.js');
const { observeStore } = require('./store');

const { 
    init, 
    initComplete, 
    setDiscordClient, 
    setDbClient, 
    setRedisClient, 
    setMessage,
    setCharacters,
    unsetCharacters,
} = require('./actions');

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
    setRedisClient(redis.createClient(process.env.REDIS_URL));
    await init();
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

const shouldExitReaction = (reaction, user) => {
    return user.bot
        || !reaction 
        || !reaction.message 
        || !reaction.message.embeds 
        || !reaction.message.embeds[0]
        || !reaction.message.embeds[0].footer
        || !reaction.message.embeds[0].footer.text;
}

discordClient().on('messageReactionAdd', (reaction, user) => {
    if (shouldExitReaction(reaction, user) || !ready()) {
        return;
    }

    setMessage(reaction.message);
    const footer = reaction.message.embeds[0].footer.text;
    args = footer.split('.');
    setCharacters(args[1], reaction.emoji.name, reaction.users);
});

discordClient().on('messageReactionRemove', (reaction, user) => {
    if (shouldExitReaction(reaction, user) || !ready()) {
        return;
    }

    setMessage(reaction.message);
    const footer = reaction.message.embeds[0].footer.text;
    args = footer.split('.');
    unsetCharacters(args[1], reaction.emoji.name, reaction.users);
})

discordClient().login(process.env.DISCORD_TOKEN);

const exitHandler = () => {
    dbClient() && dbClient().release();
};

const errorHandler = async e => {
    const errorChannel = 'laty-errors';
    let channel = guild().channels.find(c => c.name === errorChannel);
    if (!channel) {
        channel = await guild().createChannel('laty-errors', { type: 'text' }, [
            {
                id: guild().defaultRole.id,
                deny: ['VIEW_CHANNEL', 'READ_MESSAGES', 'READ_MESSAGE_HISTORY'],
            }
        ]);
    }

    channel.send(createErrorEmbed(e));

    console.error(e);
    exitHandler.bind(null, { exit: true });
};


observeStore(state => state.error, async error => error && await errorHandler(error));

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