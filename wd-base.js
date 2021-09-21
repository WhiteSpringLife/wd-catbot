const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

module.exports = function (config, commands) {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', message => {
        if (message.author.bot || message.channel.type == "dm") return;
        if (!message.content.startsWith(config.prefix)) return;

        let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (commands.get(cmd)) {
            console.log(Object.prototype.toString.call(commands.get(cmd)));
            if (typeof (commands.get(cmd)) == "string") {
                message.channel.send(commands.get(cmd));
            }
            else if (isPromise(commands.get(cmd))) {
                commands.get(cmd).then(res => message.channel.send(res));
            }
            else if (isAsyncFunction(commands.get(cmd))) {
                commands.get(cmd)().then(res => message.channel.send(res));
            }
            else {
                // string과 promise가 아니라면 자동으로 object 이다.
                if (commands.get(cmd).constructor.name == "MessageEmbed") {
                    message.channel.send({ embeds: [commands.get(cmd)] })
                }
                else {
                    commands.get(cmd)?.run().then(res => message.channel.send(res));
                }
            }
        }
    });

    client.login(config.token);
}

function isPromise(p) {
    return p && Object.prototype.toString.call(p) === "[object Promise]";
}

function isAsyncFunction(p) {
    return p && Object.prototype.toString.call(p) === "[object AsyncFunction]";
}