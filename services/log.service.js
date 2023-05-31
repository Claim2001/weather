import chalk from 'chalk';

const printError = (error) => {
    console.log(chalk.bgRed('Error ')+error);
} 
const printSuccess = (message) => {
    console.log(chalk.bgGreen('Success ')+message);
} 
const printHelp = () => {
    console.log(chalk.bgCyan('HELP\n')+'Без параметров - вывод погоды\n'+'-s [CITY] для установки города\n'+'-h для вывода помощи\n'+'-t [API_KEY] для сохранения токена')
}
export {printError, printSuccess, printHelp};