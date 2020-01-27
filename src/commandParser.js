const fs = require('fs');
const { message, guild } = require('./selectors');
const { createHelpEmbed, createFailureEmbed } = require('./utils/messageUtils.js');

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
    fs.readdirSync(`${process.cwd()}/src/cmds`)
        .filter(f => f.endsWith('.js'))
        .forEach(f => {
            const cmd = build(require(`${process.cwd()}/src/cmds/${f}`));
            result[cmd.name || f.replace('.js', '')] = cmd;
        });
    return result;
};

const authenticate = (cmd, next) => {
    const user = guild().members.find(m => m.id === message().author.id);
    if (cmd.authenticator(user)) {
        next.execute();
    } else {
        message().channel.send(createFailureEmbed({
            title: "Sorry, you're not allowed to do that.",
            description: "Looks like you're lacking the necessary role to perform this action. Talk to your Discord server manager to sort that out."
        }));
    }
};

const printLinkLevel = x => {
    let s = '-';
    for (let i = 0; i < x; i++) {
        s += '-';
    }
    return s + '>';
}

const getChainLink = (name, index, cmd, args) => {
    const execHandler = function() {
        console.log(`${printLinkLevel(index)} ${name}`);
        this.handler(this.next);
    }

    let link = {
        help: cmd.help,
    };

    if (cmd.authenticator) {
        link.next = {
            handler: next => cmd.handler(args, next),
            help: cmd.help,
        };

        link.next.execute = execHandler;
        link.next.execute.bind(link.next);
        link.handler = next => authenticate(cmd, next);
    } else {
        link.handler = next => cmd.handler(args, next);
    }

    link.execute = execHandler;
    link.execute.bind(link);
    return link;
};

const parse = (input, rootHelpData) => {
    let cmds = commands();
    const args = input.trim().split(' ').map(a => a.trim());
    const isHelp = args.length == 0 || args[args.length - 1] === 'help';
    if (isHelp) {
        if (args.length <= 1) {
            console.log('> help');
            const msg = createHelpEmbed(rootHelpData)
            const sender = message().channel.send;
            return { execute: () => sender(msg) };
        }

        args.pop();
    }

    // First arg is always the root cmd
    args.shift();

    const shiftedArgs = [...args];
    const rootCmd = shiftedArgs.shift();

    if (!cmds[rootCmd]) {
        throw 'Invalid command';
    }

    const chainRoot = getChainLink(rootCmd, 0, cmds[rootCmd], [...shiftedArgs]);
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

        current.next = getChainLink(inputCmd, i, cmds[inputCmd], [...shiftedArgs]);
        current = current.next;

        cmds = cmds[inputCmd].children;
    }

    if (isHelp) {
        let current = chainRoot;
        while (current != null) {
            if (current.next == null) {
                const embed = createHelpEmbed(current.help);
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