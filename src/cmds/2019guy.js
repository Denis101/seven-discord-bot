const { guild, channel } = require('../selectors');

// Super secret command :)
module.exports = {
    help: {
        title: '2019 Guy',
        description: `
Hello, hi, I'm a 2019 guy
I don't need drugs to get high
I have Soylent and wine
I respect girls by getting friend zoned and denied
I think about them and cry
I am totally fine

Testosterone's low, feelings high
That's how you know I'm truly a 2019 Guy

My dick's not big, my girlfriend fucked my friend
You say I'm down on my luck, I say it's a win-win
'Cause I'm a cuck
And I hope he fucks her good
In a way, I wish I could
I just want to WATCH!

Hello, hi, I'm a 2019 guy
I think science is a lie
I am offended online
I'm fragile and shy
I don't really go outside
I don't have friends that's why I am offended all the time

2019
2019
2019

My dick's not big, my girlfriend fucked my friend
You say I'm down on my luck, I say it's a win-win
'Cause I'm a cuck
And I hope he fucks her good
In a way, I wish I could
His dick's not big, so I fucked his friend
I say he's down on his luck, he says it's a win-win
'Cause I'm a cuck
And I hope he fucks her good
In a way, I wish I could
I just want to WATCH!

2019
2019
2019
`
    },
    handler: async () => {
        const voiceChannel = guild().channels.find(c => c.name === "Just Chatting");
        if (!voiceChannel.joinable) {
            channel().send('I don\'t have permissions to join the voice channel :(');
        }

        await voiceChannel.join();
        channel().send('-play https://www.youtube.com/watch?v=4SiiRx7GDzI');
    },
};