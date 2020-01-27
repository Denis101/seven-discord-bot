const fs = require('fs');
const { message } = require('./selectors');

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
}

const authenticate = (cmd, next) => {
    if (cmd.authenticator(message().author)) {
        next();
    }
}

const getChainLink = (cmd, args) => {
    let link = {};

    if (cmd.authenticator) {
        link.next = {
            handler: next => cmd.handler(args, next),
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
}

const parse = input => {
    let cmds = commands();
    const args = input.trim().split(' ');

    // First arg is always the root cmd
    args.shift();

    const shiftedArgs = [...args];
    const rootCmd = shiftedArgs.shift();

    if (!cmds[rootCmd]) {
        throw 'Invalid command';
    }

    const chainRoot = getChainLink(cmds[rootCmd], shiftedArgs);
    let current = chainRoot;
    cmds = cmds[rootCmd].children;

    for (let i = 1; i < args.length; i++) {
        const inputCmd = shiftedArgs.shift();
        if (!cmds[inputCmd]) {
            break;
        }

        if (current === null) {
            current = getChainLink(cmds[inputCmd], shiftedArgs)
        } else {
            // Has an authenticator, move to next chain link
            if (current.next) {
                current = current.next;
            }

            current.next = getChainLink(cmds[inputCmd], shiftedArgs);
            current = current.next;
        }

        cmds = cmds[inputCmd].children;
    }

    return chainRoot;
};

module.exports = {
    parse,
};