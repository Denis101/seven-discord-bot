const moment = require('moment');
const { createListEmbed } = require('../../utils/messageUtils.js');
const { channel, raids } = require('../../selectors');
const { getNext } = require('../../utils/dateTimeUtils.js');
const { guildLeader } = require('../../authenticators.js');

const getTime = (day, time) => `**${moment().to(getNext(day, time))}**  ${getNext(day, time).calendar()}`;

module.exports = {
    authenticator: guildLeader,
    help: {
        title: '@Laty raid list',
        description: 'Lists all raids.',
    },
    handler: async () => {
        const fields = Object.keys(raids() || [])
            .map(k => {
                const hasDayAndTime = !!raids()[k].day && !!raids()[k].time;
                const name = raids()[k].name || raids()[k].slug;
                const timeUntil = getTime(raids()[k].day, raids()[k].time, raids()[k].frequencyWeeks);
                return `**__${name}__**${hasDayAndTime ? ` - :watch: Next raid ${timeUntil}` : ''}`;   
            });

        const title = fields.length > 0
            ? 'Here\'s a list of all the raids I\'m managing'
            : 'I\'ve not been given any raids to manage!';

        channel().send(createListEmbed({
            title,
            description: fields.join('\n'),
        }));
    },
}