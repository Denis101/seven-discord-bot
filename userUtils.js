const getUserRef = id => {
    return '<@!' + id + '>';
};

const userIsReferenced = (message, id) => {
    return message.content.includes(getUserRef(id));
};

module.exports = {
    getUserRef,
    userIsReferenced,
};