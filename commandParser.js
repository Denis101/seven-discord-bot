const fs = require('fs');

let _cmdTree = null;

const Command = () => {
    this.parent = null;
    this.name = null;
};

const parse = cmdDef => {
    const cmd = {
        ...cmdDef,
        children: [],
    };

    if (_cmdTree === null) {
        _cmdTree = cmd;   
    }

    if (cmdDef.directory) {
        const files = fs.readdirSync(cmdDef.directory);
        files.filter(f => f.endsWith('.js'))
            .map(f => cmd.children.push(parse(require(`${cmd.directory}/${f}`))));
    }
};

parse(require('./cmds/raid-team.js'));
module.exports = parse;