#!/usr/bin/env node
import chalk from 'chalk';
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length){
        printError('Не передан токен');
        return; 
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранён');
    }
    catch (e) {
        printError(e.message);
    }
}

const saveTown = async (city) => {
    if (!city.length){
        printError('Не передан город');
        return; 
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранён');
    }
    catch (e) {
        printError(e.message);
    }
}

const getForcast = async () => {
    try{
        const weather = await getWeather(await getKeyValue('city'));
        console.log("Погода: "+weather.weather[0].description);
        console.log("Температура: "+weather.main.temp);
        let max_temp = weather.main.temp_max
        console.log("Максимальная температура: "+ (max_temp > 23 ?chalk.bgRed(max_temp):chalk.bgBlue(max_temp))) 

    } catch (e) {
        if (e?.response?.status == 404) {
            printError("Неверно указан город");
        } else if (e?.response?.status == 401) {
            printError("Неверно указан токен");
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        return saveTown(args.s);
    }
    if (args.t) {
        return saveToken(args.t);

    }
    getForcast();


};

initCLI();