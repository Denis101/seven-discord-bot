let _client = null;
let _message = null;

const State = {
    getClient: () => _client,
    setClient: client => _client = client,
    getMessage: () => _message,
    setMessage: message => _message = message,
};

Object.freeze(State);
module.exports = State;