const Telegraf = require('telegraf');
const express  = require('express');
const getCep   = require('./services/cep.js');
const trim     = require('./utils/trim.js');
const track    = require('./services/package.js');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

bot.command('start', ({from, reply}) => {
    console.log('start', from);
    return reply('Bem vindo!');
});

bot.command('cep', ({from, reply, message}) => {
    console.log('cep', from);
    console.log(message.text);
    if (message.text.length <= 4) return reply('Você deve passar o número do seu CEP'); 

    let cep = message.text.substring(message.entities[0].length, message.text.length);
    cep = trim(cep);

    getCep(cep).then((result) => {
        let reply_msg = `Cidade: ${result.cidade} - ${result.estado} \n`;
        reply_msg =  `${reply_msg}Área da Cidade: ${result.cidade_info.area_km2} KM² \n`;
        reply_msg =  `${reply_msg}Área do Estado: ${result.estado_info.area_km2} KM²`;
        return reply(reply_msg);
    }).catch(() => reply('CEP inválido :(')); 
});

bot.command('rastrear', ({from, reply, message}) => {
    console.log('rastrear', from);
    console.log(message.text);
    if (message.text.length <= 7) return reply('Você deve passar o número do seu código de rastreio');

    let tracking_code = message.text.substring(message.entities[0].length, message.text.length);
    tracking_code = trim(tracking_code);

    track(tracking_code).then((result) => {
        let reply_msg = '';
        result.historico.forEach((element) => {
            if (element.detalhes === '') reply_msg += `\nLocal:${element.local} \nData: ${element.data} \nSituação: ${element.situacao}\n`;
            else reply_msg += `\nLocal:${element.local} \nData: ${element.data} \nSituação: ${element.situacao} \nDetalhes: ${element.detalhes}\n`;
        });
        return reply(reply_msg);
    }).catch(() => reply('Código de rastreio inválido :(')); 
});

bot.startPolling();

app.listen(app.get('port'), () => {
    console.log('Running on port', app.get('port'));
});