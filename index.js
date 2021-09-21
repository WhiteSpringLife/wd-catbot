const config = require('./config.json');

let commands = require("./Collection")(
    [
        { k: ['cv', 'ㅊㅍ', 'covid'], v: require('wd-covid'), d: '대한민국 코로나 상태' },
        { k: ['p', 'ping', 'ㅔ', 'ㅔㅑㅜㅎ'], v: 'pong tt', d: '핑 상태' },
    ],
    "냥이",
    config.prefix
);

const bot = require("./wd-base")(config, commands);
