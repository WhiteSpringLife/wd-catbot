const config = require("./config.json");

let commands = require("./Collection")(
    [
        { k: ['cv', 'ㅊㅍ', 'covid'], v: require('wd-covid'), d: '대한민국 코로나 상태' },
        { k: ['p', 'ping', 'ㅔ', 'ㅔㅑㅜㅎ'], v: '미구현.. ㅎ...', d: '핑 상태' },
        {
            k: ['s', 'ㄴ', '휘두루기', '스윙', 'ㅅㅇ'],
            v: require('../wd-swing/index').attack(),
            d: '휘두루기 게임 - 휘두루기'
        },
        { k: ['l', 'ㅣ', '리더보드'], v: require('../wd-swing/index').leaderboard(), d: '휘두루기 게임 - 랭킹보드' },
        { k: ['r', 'ㄱ', '강화'], v: require('../wd-swing/index').reinforcement(), d: '휘두루기 게임 - 강화(돈으로, 1회)' },
        { k: ['a', 'ㅁ', '전부강화'], v: require('../wd-swing/index').reinforcementAll(), d: '휘두루기 게임 - 강화(돈으로, 있는 돈 전부)' },
    ],
    "냥이",
    config.prefix
);

const bot = require('wd-bot-base')(config, commands);
