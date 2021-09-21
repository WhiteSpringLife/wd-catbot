const { Collection, MessageEmbed } = require('discord.js');
let commands = new Collection();

module.exports = function (add_commands, bot_name, prefix) {

    AddCommand(add_commands);

    Help(add_commands, bot_name, prefix);

    return commands;
}

function AddCommand(add_commands) {
    add_commands.forEach(command => {
        console.log(command.k);
        if (typeof (command.k) == "object") {
            command.k.forEach(command_k => {
                commands.set(command_k, command.v);
            });
        }
        else {
            commands.set(command.k, command.v);
        }
    });
}

function Help(add_commands, bot_name, prefix) {
    const helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
    let embed = new MessageEmbed()
        .setAuthor(`Help of ${bot_name} BOT`, helpImg)
        .setColor('#186de6')
        .setFooter(`${bot_name} BOT ❤️`);
    let helpCommand = { k: ['h', 'help', 'ㅗ', 'ㅗ디ㅔ', 'commands', '도움', '헬프'], v: embed, d: "봇의 명령어들 표기" };

    let normal_desc = '';
    add_commands.sort().forEach(command => {
        normal_desc += SubHelp(command, prefix);
    });
    normal_desc += SubHelp(helpCommand, prefix);

    embed.addField(`Commands :`, normal_desc);

    AddCommand([helpCommand]);
}

function SubHelp(command, prefix) {
    let k = typeof (command.k) == "object" ? command.k[0] : command.k;
    let d = command.d;
    return `• \`\`${HelpTextConvert(`${prefix + k}`)}\`\` : **${d}**\n`;
}

function HelpTextConvert(str, limitLen = 8) {
    let tmp = str;
    limitLen -= tmp.length;

    for (let i = 0; i < limitLen; i++) {
        tmp += ' ';
    }

    return tmp;
}