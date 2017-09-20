const Telegraf = require('telegraf');
const express  = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

bot.command('start', ({from, reply}) => {
    console.log('start', from);
    return reply('Welcome!');
});

bot.startPolling();

app.listen(app.get('port'), () => {
    console.log('Running on port', app.get('port'));
});