const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

program
    .requiredOption('-t, --token <bot token>', 'bot token')
    .option('-p, --prefix <prefix>', 'prefix', '.')
    .parse();

// console.log(program.opts().token);
// console.log(program.opts().prefix);

fs.writeFile('config.json', JSON.stringify(program.opts(), null, '\t'), function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});