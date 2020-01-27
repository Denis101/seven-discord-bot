const getUserRef = id => {
    return '<@!' + id + '>';
};

const userIsReferenced = (message, id) => {
    return message.content.includes(getUserRef(id));
};

const getNickname = member => member.nickname || member.user.username;

module.exports = {
    getUserRef,
    userIsReferenced,
    getNickname,
};