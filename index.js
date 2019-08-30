#!/usr/bin/env node

const axios = require('axios');
const country = require("country-list");
const chalk = require('chalk');
const figlet = require('figlet');
const ora = require('ora');
const chalkAnimation = require('chalk-animation');
const prompts = require('prompts');
const clear = require("clear");
const uri = "https://date.nager.at/api/v2/publicholidays/";

const questions = [{
        type: "text",
        name: "chooseCountry",
        message: "Choose a country ? "
    },
    {
        type: "number",
        name: "chooseYear",
        message: "Choose a year ? "

    }
];

let holiday = async () => {
    const response = await prompts(questions);

    let thisCountry = response.chooseCountry;
    let thisYear = response.chooseYear;

    if (thisYear == "") {
        thisYear = new Date().getFullYear(); // Prend l'année en cours si on entre pas de date
    }

    let countryCode = country.getCode(thisCountry); // On recupère le code du pays

    try {
        const result = await axios.get(`${uri}${thisYear}/${countryCode}`);


        console.log(chalk.magenta(figlet.textSync('Holidays', {
            font: 'Standard',
            horizontalLayout: 'fitted',
            verticalLayout: 'default'
        })));


        let holidays = Array.from(result.data); // On récupère sous forme d'un tableau

        const rainbow = chalkAnimation.rainbow(`This is a list of holidays in ${thisCountry}, ${thisYear} :`).stop(); // Don't start the animation

        rainbow.render(); // Display the first frame

        const frame = rainbow.frame(); // Get the second frame
        console.log(frame);


        holidays.forEach(el => {
            console.log(`${el.date} : ${el.name}.`);
        });
    } catch (err) {
        console.log(
            chalk.bgRed("Incorrect values. Please try again : "));
        holiday();
    }
};

clear();
holiday();