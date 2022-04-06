const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const fs = require('fs');
import fetch from 'node-fetch';

const main = async () => {
    const target = 'https://www.city.setagaya.lg.jp/mokuji/kusei/001/001/004/d00185364.html';
    const html: any = await fetch(target)
        .then((response: { text: () => any; }) => response.text())
        .then((body: any) => {return body});

    const cRoot = cheerio.load(html);
    const table = cRoot('table')[0];
    const cTable = cheerio.load(table);
    cheerioTableparser(cTable);
    const data = cTable('table').parsetable();

    const new_record = {
        'date': new Date().toISOString().split('T')[0],
        'confirmed_cases': data[1][0].match(/\d+/)[0],
        'inpatient_care': data[1][1].match(/\d+/)[0],
        'hotel_care': data[1][2].match(/\d+/)[0],
        'home_care': data[1][3].match(/\d+/)[0],
        'cured': data[1][4].match(/\d+/)[0],
        'deaths': data[1][5].match(/\d+/)[0],
    };

    let json_data = JSON.parse(fs.readFileSync('./data/output.json'));
    json_data.data.unshift(new_record);

    fs.writeFileSync('./data/output.json', JSON.stringify(json_data));
    console.log(new_record);

    
};

main();
