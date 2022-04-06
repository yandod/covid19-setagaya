const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
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
    console.log(data);
};

main();
