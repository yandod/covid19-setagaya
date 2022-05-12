const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const fs = require('fs');
import fetch from 'node-fetch';

const main = async () => {
    const target = 'https://www.city.setagaya.lg.jp/mokuji/kusei/001/001/004/d00185364.html';
    const response = await fetch(target);
    const html = await response.text();
    const page = cheerio.load(html);

    //updated date
    const updatedDate = cheerio.load(page('h3:contains("検査陽性者の状況")').next()[0]).text();
    console.log(updatedDate);

    //basic information
    const table = page('table')[0];
    const cTable = cheerio.load(table);
    cheerioTableParser(cTable);
    const basicData = cTable('table').parsetable();
    console.log(basicData);

    //gender stats
    const genderTable = cheerio.load(page('h3:contains("男女別人数")').next().next()[0]);
    cheerioTableParser(genderTable);
    const genderData = genderTable('table').parsetable();
    console.log(genderData);

    //age stats
    const ageTable = cheerio.load(page('h3:contains("年代別人数")').next().next()[0]);
    cheerioTableParser(ageTable);
    const ageData = ageTable('table').parsetable();
    console.log(ageData);

    //age stats over 70
    // same selector, obtain next object somehow.
    const age70Table = cheerio.load(page('h3:contains("年代別人数")').next().next()[0]);
    cheerioTableParser(age70Table);
    const age70Data = age70Table('table').parsetable();
    console.log(age70Data);

    const new_record = {
        'date': new Date().toISOString().split('T')[0],
        'updated_date': updatedDate,
        'confirmed_cases': basicData[1][0].match(/\d+/)[0],
        'inpatient_care': basicData[1][1].match(/\d+/)[0],
        'hotel_care': basicData[1][2].match(/\d+/)[0],
        'home_care': basicData[1][3].match(/\d+/)[0],
        'cured': basicData[1][4].match(/\d+/)[0],
        'deaths': basicData[1][5].match(/\d+/)[0],
        'confirmed_cases_male': genderData[0][1].match(/\d+/)[0],
        'confirmed_cases_female': genderData[1][1].match(/\d+/)[0],
        'confirmed_cases_age_0_9': ageData[1][1].match(/\d+/)[0],
        'confirmed_cases_age_10_19': ageData[2][1].match(/\d+/)[0],
        'confirmed_cases_age_20_29': ageData[3][1].match(/\d+/)[0],
        'confirmed_cases_age_30_39': ageData[4][1].match(/\d+/)[0],
        'confirmed_cases_age_40_49': ageData[5][1].match(/\d+/)[0],
        'confirmed_cases_age_50_59': ageData[6][1].match(/\d+/)[0],
        'confirmed_cases_age_60_69': ageData[7][1].match(/\d+/)[0],
        'confirmed_cases_age_70_79': age70Data[1][1].match(/\d+/)[0],
        'confirmed_cases_age_80_89': age70Data[2][1].match(/\d+/)[0],
        'confirmed_cases_age_90_99': age70Data[3][1].match(/\d+/)[0],
        'confirmed_cases_age_100_109': age70Data[4][1].match(/\d+/)[0],
        'confirmed_cases_age_unknown': age70Data[5][1].match(/\d+/)[0],
    };

    let json_data = JSON.parse(fs.readFileSync('./data/output.json'));
    if (json_data.data[0].date == new_record.date) {
        json_data.data[0] = new_record;
    } else {
        json_data.data.unshift(new_record);
    }
    console.dir(new_record);
    fs.writeFileSync('./data/output.json', JSON.stringify(json_data,null,2));

    
};

main();
