#!/usr/bin/env node

const chalk = require("chalk");

console.log("adios world");

const axios = require('axios');
const {
    getCode,
    getName
} = require('country-list');



let country = "";
let date = "";
process.argv.forEach((valeur, index) => {
    console.log(`${index}: ${valeur}`);

    if (index == 2) {
        country = valeur;
    }
    if (index == 3) {
        date = valeur;
    }
});

let countryCode = getCode(country);

if (date == "") {

    date = new Date().getFullYear();
}

axios.get(`https://date.nager.at/api/v2/PublicHolidays/${date}/${countryCode}`).then(function (reponse) {
    // console.log(reponse.data);


    for (let i = 0; i < reponse.data.length; i++) {
        console.log(`${reponse.data[i].date} ${chalk.magenta(reponse.data[i].localName)} `);
    }
})