let _client = null;
let _message = null;

// hardcode for now
let _teams = ['EU', 'NA'];

const State = {
    getClient: () => _client,
    setClient: client => _client = client,
    getMessage: () => _message,
    setMessage: message => _message = message,
    getTeams: () => _teams,
    addTeam: team => _teams.push(team),
    removeTeam: team => _teams.indexOf(team) > -1 && _teams.splice(_teams.indexOf(team), 1),
};

Object.freeze(State);
module.exports = State;