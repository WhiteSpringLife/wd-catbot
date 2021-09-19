const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



let commands = new Collection();
commands.set('ㅊㅍ', require('wd-covid'));
commands.set('cv', require('wd-covid'));

client.on('messageCreate', message => {
    if (message.author.bot || message.channel.type == "dm") return;
    if (!message.content.startsWith(config.prefix)) return;

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (message.content === config.prefix+'ping') {
        message.channel.send('pong');
    }
    else if(commands.get(cmd))
    {
        commands.get(cmd).then(res => message.channel.send(res));
    }
});



client.login(config.token);