const fs = require('fs');
const { RichEmbed } = require('discord.js');
const { message, guild } = require('./selectors');

const build = cmdDef => {
    const cmd = {
        ...cmdDef,
    };

    if (cmdDef.directory) {
        const files = fs.readdirSync(cmdDef.directory);
        if (files.length <= 0) {
            return cmd;
        }

        cmd.children = {};
        files.filter(f => f.endsWith('.js'))
            .forEach(f => {
                const childCmd = build(require(`${cmd.directory}/${f}`));
                if (childCmd.handler) {
                    cmd.children[childCmd.name || f.replace('.js', '')] = childCmd;
                }
            });
    }

    return cmd;
};

const commands = () => {
    const result = [];
    fs.readdirSync(`${process.cwd()}/cmds`)
        .filter(f => f.endsWith('.js'))
        .forEach(f => {
            const cmd = build(require(`${process.cwd()}/cmds/${f}`));
            result[cmd.name || f.replace('.js', '')] = cmd;
        });
    return result;
};

const authenticate = (cmd, next) => {
    const user = guild().members.find(m => m.id === message().author.id);
    if (cmd.authenticator(user)) {
        next();
    } else {
        message().channel.send("Sorry, you're not allowed to do that.");
    }
};

const getChainLink = (cmd, args) => {
    let link = {
        help: cmd.help,
    };

    if (cmd.authenticator) {
        link.next = {
            handler: next => cmd.handler(args, next),
            help: cmd.help,
        }

        link.next.execute = function() {
            this.handler(this.next);
        }

        link.next.execute.bind(link.next);
        link.handler = next => authenticate(cmd, next);
    } else {
        link.handler = next => cmd.handler(args, next);
    }

    link.execute = function() {
        this.handler(this.next);
    }

    link.execute.bind(link);
    return link;
};

const parse = input => {
    let cmds = commands();
    const args = input.trim().split(' ');
    const isHelp = args[args.length - 1] === 'help';
    if (isHelp) {
        args.pop();
    }

    // First arg is always the root cmd
    args.shift();

    const shiftedArgs = [...args];
    const rootCmd = shiftedArgs.shift();

    if (!cmds[rootCmd]) {
        throw 'Invalid command';
    }

    const chainRoot = getChainLink(cmds[rootCmd], [...shiftedArgs], isHelp);
    let current = chainRoot;
    cmds = cmds[rootCmd].children;

    for (let i = 1; i < args.length; i++) {
        const inputCmd = shiftedArgs.shift();
        if (!cmds || !cmds[inputCmd]) {
            break;
        }

        // Has an authenticator, move to next chain link
        if (current.next) {
            current = current.next;
        }

        current.next = getChainLink(cmds[inputCmd], [...shiftedArgs]);
        current = current.next;

        cmds = cmds[inputCmd].children;
    }

    if (isHelp) {
        let current = chainRoot;
        while (current != null) {
            if (current.next == null) {
                const embed = new RichEmbed()
                    .setTitle(current.help.title)
                    .setDescription(current.help.description)
                    .setColor(0x000000);

                if (current.help.fields && current.help.fields.length > 0) {
                    current.help.fields.forEach(f => {
                        embed.addField(f.title, f.description, f.inline || false);
                    });
                }

                current.handler = () => message().channel.send(embed);
            } else {
                current.handler = next => next.execute();
            }

            current = current.next;
        }
    }

    return chainRoot;
};

module.exports = {
    parse,
};