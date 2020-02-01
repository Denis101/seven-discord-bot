const fs = require('fs');
const { channel, author, guild } = require('../selectors');
const { createListEmbed, createFailureEmbed } = require('../utils/messageUtils.js');

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
    const user = guild().members.find(m => m.id === author().id);
    if (cmd.authenticator(user)) {
        next.execute();
    } else {
        channel().send(createFailureEmbed("Sorry you're not allowed to do that"));
    }
};

const getChainLink = (cmd, args) => {
    const execHandler = function() {
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

const parseArgs = input => {
    const getArgs = line => {
        let isQuote = false;
        let current = '';
        const quotedArgs = [];

        [...line].forEach(c => {
            if (c === '"') {
                isQuote = !isQuote;
                if (isQuote === true) {
                    current = '';
                }
                else {
                    quotedArgs.push(current);
                }

                return;
            }

            if (isQuote) {
                current += c;
            }
        });

        quotedArgs.forEach((a, i) => line = line.replace(`"${a}"`, `"${i}"`));
        const args = line.trim().split(' ').filter(a => !!a);

        if (quotedArgs.length > 0) {
            for (let i = 0; i < args.length; i++) {
                if (!args[i].startsWith('"') && !args[i].endsWith('"')) {
                    continue;
                }
                
                const idx = parseInt(args[i].replace('"', ''));
                if (isNaN(idx)) {
                    continue;
                }
    
                args[i] = quotedArgs[idx];
            }
        }

        return args;
    };

    let args = [];
    if (input.includes('\n')) {
        const lines = input.split('\n');
        const line1 = lines.shift();
        args = [...getArgs(line1), lines.join('\n')];
    }
    else {
        args = getArgs(input);
    }

    return args;
};

const parse = (input, rootHelpData) => {
    let cmds = commands();
    const args = parseArgs(input);

    // First arg is always the root cmd
    args.shift();

    const isHelp = args.length < 1 || args[args.length - 1] === 'help';
    if (isHelp) {
        // either no cmd provided, or root cmd is help
        if (args.length <= 1) { 
            channel().send(createListEmbed(rootHelpData));
            return { execute: () => {} };
        }

        args.pop();
    }

    const shiftedArgs = [...args];
    const rootCmd = shiftedArgs.shift();

    if (!cmds[rootCmd]) {
        channel().send(createFailureEmbed(`I didn't understand your command: \`${args.join(' ')}\``))
        return { execute: () => {} };
    }

    const chainRoot = getChainLink(cmds[rootCmd], [...shiftedArgs]);
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
                const embed = createListEmbed(current.help);
                current.handler = () => channel().send(embed);
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